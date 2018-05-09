import uuidv4 from 'uuid/v4';
import moment from 'moment';
import mealsDB from '../../data/meals.json';
import ordersDB from '../../data/orders.json';
import orderItemsDB from '../../data/orderItems.json';
import errors from '../../data/errors.json';
import GetItems from '../middlewares/GetItems';
import OrderItems from './OrderItems';
import isOrderExpired from '../helpers/isOrderExpired';
import getMealOwner from '../helpers/getMealOwner';
import Notifications from './Notifications';
import removeDuplicates from '../helpers/removeDuplicates';

/**
 * @exports
 * @class Orders
 * @extends Controller
 */
class Orders {
  /**
   * Returns a list of Order Items
   * @method getOrders
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {(function|object)} Function next() or JSON object
   */
  static getOrders(req, res) {
    const { role } = req;

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
   * if date is provided in query, get orders that belong
   * to user and were created on that date
   */
  static getUsersOrders(req, res) {
    const { userId, query: { date } } = req;
    let list = ordersDB.filter(item => item.userId === userId);

    if (date) {
      const dateToFind = date === 'today' ? moment().format('YYYY-MM-DD') : date;
      list = ordersDB.filter(item => item.date.includes(dateToFind) && item.userId === userId);
    }

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
   * if date query was added, get all orders whose created at include the date
   * includes is used instead of equality because created at is a full date string
   */
  static getCaterersOrders(req, res) {
    const { userId, query: { date } } = req;
    // get caterer's mealIds from mealsDB
    const mealIdsArray = mealsDB.reduce((idArray, meal) => {
      if (meal.userId === userId) idArray.push(meal.mealId);
      return idArray;
    }, []);

    const caterersOrderIds = orderItemsDB.reduce((idArray, orderItem) => {
      if (mealIdsArray.includes(orderItem.mealId)) idArray.push(orderItem.orderId);
      return removeDuplicates(idArray);
    }, []);

    let list = ordersDB.filter(order => caterersOrderIds.includes(order.orderId));

    if (date) {
      const dateToFind = date === 'today' ? moment().format('YYYY-MM-DD') : date;
      list = ordersDB.filter(order => order.date.includes(dateToFind)
        && caterersOrderIds.includes(order.orderId));
    }

    list.map(orderItem => Orders.getOrderObject(orderItem, req.userId));

    return GetItems.items(req, res, list, 'orders');
  }

  /**
   * Creates a new item
   * @method create
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * notification is created when an order is made
   * order is expired after 15 minutes of original purchase
   */
  static create(req, res) {
    const data = { ...req.body };

    data.orderId = uuidv4();
    data.date = req.body.date || moment().format('YYYY-MM-DD');
    data.meals = removeDuplicates(data.meals);
    data.userId = 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';
    data.createdAt = moment().format();
    data.updatedAt = moment().format();

    OrderItems.create(data.orderId, req.body.meals);

    delete data.role;

    ordersDB.push(data);

    Notifications.create({
      menuId: null,
      userId: getMealOwner(data.mealId),
      orderId: data.orderId,
      message: 'Your menu was just ordered'
    });

    const order = Orders.getOrderObject(data);

    return res.status(201).send(order);
  }

  /**
   * Updates an order
   * @method update
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * notification is created on order update
   */
  static update(req, res) {
    const data = { ...req.body };
    const { orderId } = req.params;
    const itemIndex =
      ordersDB.findIndex(item => item.orderId === orderId && item.userId === req.userId);

    if (itemIndex === -1) return res.status(404).send({ error: errors[404] });

    if (isOrderExpired('order', ordersDB, orderId)) return res.status(422).send({ error: 'Order is expired' });

    data.userId = req.userId;
    data.updatedAt = moment().format();
    data.createdAt = moment().format();
    data.orderId = orderId;
    data.meals = removeDuplicates(data.meals);

    const oldOrder = ordersDB[itemIndex];

    ordersDB[itemIndex] = { ...oldOrder, ...data };

    OrderItems.update(data.orderId, req.body.meals);

    Notifications.create({
      menuId: null,
      userId: getMealOwner(data.mealId),
      orderId: data.orderId,
      message: 'This order was just updated'
    });

    data.meals = data.meals.map(item => mealsDB.find(meal => meal.mealId === item));

    return res.status(200).send(data);
  }

  /**
   * Deletes an existing order
   * @method delete
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static delete(req, res) {
    const { orderId } = req.params;
    const itemIndex =
      ordersDB.findIndex(item => item.orderId === orderId && item.userId === req.userId);

    if (itemIndex === -1) return res.status(404).send({ error: errors[404] });

    if (isOrderExpired('order', ordersDB, orderId)) return res.status(422).send({ error: 'Order is expired' });

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
