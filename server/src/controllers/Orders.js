import uuidv4 from 'uuid/v4';
import moment from 'moment';
import mealsDB from '../../data/meals.json';
import ordersDB from '../../data/orders.json';
import orderItemsDB from '../../data/orderItems.json';
import errors from '../../data/errors.json';
import GetItems from '../middlewares/GetItems';
import OrderItems from './OrderItems';
import isExpired from '../helpers/isExpired';
import removeDuplicates from '../helpers/removeDuplicates';

/**
 * @exports
 * @class Orders
 * @extends Controller
 */
class Orders {
  /**
   * Returns a list of Items
   * @method list
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {(function|object)} Function next() or JSON object
   */
  static list(req, res) {
    const { role } = req.body;

    return role === 'caterer' ?
      Orders.getCaterersOrders(req, res) :
      Orders.getUsersOrders(req, res);
  }

  /**
   * Returns Users' Orders
   * @method getUsersOrders
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static getUsersOrders(req, res) {
    const { body: { userId }, query: { date } } = req;
    let list = ordersDB.filter(item => item.userId === userId);

    // if date is provided in query, get orders that belong to user and were created on that date
    if (date) {
      const dateToFind = date === 'today' ? moment().format('YYYY-MM-DD') : date;
      list = ordersDB.filter(item => item.date.includes(dateToFind) && item.userId === userId);
    }

    // fill in list with order details
    list.map((orderItem) => {
      orderItem = Orders.getOrderObject(orderItem);
      return orderItem;
    });

    return GetItems.items(req, res, list, 'orders');
  }

  /**
   * Returns Users' Orders
   * @method getCaterersOrders
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static getCaterersOrders(req, res) {
    const { body: { userId }, query: { date } } = req;
    // get caterer's mealIds from mealsDB
    const mealIdsArray = mealsDB.reduce((idArray, meal) => {
      if (meal.userId === userId) idArray.push(meal.mealId);
      return idArray;
    }, []);

    // get all unique orderIds of order items whose meals are for caterer
    const caterersOrderIds = orderItemsDB.reduce((idArray, orderItem) => {
      if (mealIdsArray.includes(orderItem.mealId)) idArray.push(orderItem.orderId);
      return removeDuplicates(idArray);
    }, []);

    // get orders with the orderId
    let list = ordersDB.filter(order => caterersOrderIds.includes(order.orderId));

    if (date) {
      // if date query was added, get all orders whose created at include the date
      // includes is used instead of equality because created at is a full date string
      const dateToFind = date === 'today' ? moment().format('YYYY-MM-DD') : date;
      list = ordersDB.filter(order => order.date.includes(dateToFind)
        && caterersOrderIds.includes(order.orderId));
    }

    // fill in list with order details
    list.map(orderItem => Orders.getOrderObject(orderItem, req.body.userId));

    return GetItems.items(req, res, list, 'orders');
  }

  /**
   * Creates a new item
   * @method create
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static create(req, res) {
    const data = { ...req.body };

    // generate random id
    data.orderId = uuidv4();

    data.date = req.body.date || moment().format('YYYY-MM-DD');

    data.meals = removeDuplicates(data.meals);

    // fake userId, original to be gotten from jwt
    data.userId = 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';

    // generate created date
    data.created = moment().format();
    data.updated = moment().format();

    // send order items to its DB
    OrderItems.create(data.orderId, req.body.meals);

    delete data.role;

    // update Orders DB
    ordersDB.push(data);

    // // push to notifications table
    // // Caterer's for when an order is made
    // Notifications.create({
    //   menuId: null,
    //   userId: getMealOwner(data.mealId),
    //   orderId: data.orderId,
    //   message: 'Your menu was just ordered'
    // });

    const order = Orders.getOrderObject(data);

    return res.status(201).send(order);
  }

  /**
   * Creates a new item
   * @method update
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static update(req, res) {
    const data = { ...req.body };
    const { orderId } = req.params;
    const itemIndex =
      ordersDB.findIndex(item => item.orderId === orderId && item.userId === req.body.userId);

    // return 404 error if order isn't found ie order doesnt exist
    if (itemIndex === -1) return res.status(404).send({ error: errors[404] });

    // check if order is expired and return response
    if (isExpired('order', ordersDB, orderId)) return res.status(422).send({ error: 'Order is expired' });

    // update date
    data.updated = moment().format();
    data.created = moment().format();

    data.orderId = orderId;

    data.meals = removeDuplicates(data.meals);

    const oldOrder = ordersDB[itemIndex];

    // update db
    ordersDB[itemIndex] = { ...oldOrder, ...data };

    // update order items in its DB
    OrderItems.update(data.orderId, req.body.meals);

    // create notification on update

    const order = { ...data };

    order.meals = order.meals.map(item => mealsDB.find(meal => meal.mealId === item));

    return res.status(200).send(order);
  }

  /**
   * Deletes an existing item
   * @method delete
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static delete(req, res) {
    const { orderId } = req.params;
    const itemIndex =
      ordersDB.findIndex(item => item.orderId === orderId && item.userId === req.body.userId);

    // return 404 error if index isn't found ie meal option doesnt exist
    if (itemIndex === -1) return res.status(404).send({ error: errors[404] });

    // check if order is expired and return response
    if (isExpired('order', ordersDB, orderId)) return res.status(422).send({ error: 'Order is expired' });

    // delete mealItems from order items
    OrderItems.delete(orderId);
    ordersDB.splice(itemIndex, 1);

    return res.status(204).send();
  }

  /**
   * Generated Order Object to be Returned as Response
   * @method getOrderObject
   * @memberof Orders
   * @param {object} order
   * @param {string} catererId
   * @returns {object} JSON object
   */
  static getOrderObject(order, catererId = null) {
    // get order items from order items db
    const getOrderItems = orderItemsDB.filter(item => item.orderId === order.orderId);
    order.meals = [];

    if (catererId) {
      // filter meals to give only meals that belong to caterer
      getOrderItems.forEach((item) => {
        mealsDB.forEach((meal) => {
          if (item.mealId === meal.mealId && meal.userId === catererId) {
            item.meal = meal;
            order.meals.push(item);
          }
        });
      });
    } else {
      // get menu for each of the items from menuDB
      // through mealId and replace ids with real meals
      getOrderItems.forEach((item) => {
        mealsDB.forEach((meal) => {
          if (item.mealId === meal.mealId) {
            item.meal = meal;
            order.meals.push(item);
          }
        });
      });
    }

    return order;
  }
}

export default Orders;
