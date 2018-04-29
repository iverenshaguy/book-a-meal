import uuidv4 from 'uuid/v4';
import moment from 'moment';
import mealsDB from '../../data/meals.json';
import menuDB from '../../data/menu.json';
import ordersDB from '../../data/orders.json';
import errors from '../../data/errors.json';
import Notifications from './Notifications';
import trimValues from '../helpers/trimValues';
import GetItems from '../middlewares/GetItems';
import isMealAvailable from '../helpers/isMealAvailable';
import isExpired from '../helpers/isExpired';

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
      list = ordersDB.filter(item => item.created.includes(dateToFind) && item.userId === userId);
    }

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

    let list = ordersDB.filter(order => mealIdsArray.includes(order.mealId));

    if (date) {
      // if date query was added, get all orders whose created at include the date
      // includes is used instead of equality because created at is a full date string
      const dateToFind = date === 'today' ? moment().format('YYYY-MM-DD') : date;
      list = ordersDB.filter(order => order.created.includes(dateToFind)
        && mealIdsArray.includes(order.mealId));
    }

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
    if (!isMealAvailable(req.body.mealId)) res.status(422).send({ error: 'Meal is unavailable' });

    const trimmedData = trimValues(req.body);
    // generate random id
    trimmedData.orderId = uuidv4();

    // fake userId, original to be gotten from jwt
    trimmedData.userId = 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';

    // generate created date
    trimmedData.created = moment().format();
    trimmedData.updated = moment().format();

    // default quantity is 1
    trimmedData.quantity = parseInt(trimmedData.quantity, 10) || 1;

    // update DB
    ordersDB.push(trimmedData);

    // push to notifications table
    // Caterer's for when an order is made
    Notifications.create({
      menuId: null,
      userId: '8356954a-9a42-4616-8079-887a73455a7f', // caterer id to notify caterer
      orderId: trimmedData.orderId,
      message: 'Your menu was just ordered'
    });

    const order = Orders.getOrderObject(trimmedData);

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
    const { orderId } = req.params;
    const itemIndex =
      ordersDB.findIndex(item => item.orderId === orderId && item.userId === req.body.userId);

    // return 404 error if order isn't found ie order doesnt exist
    if (itemIndex === -1) return res.status(404).send({ error: errors[404] });

    // check if order is expired and return response
    if (isExpired('order', ordersDB, orderId)) return res.status(422).send({ error: 'Order is expired' });

    // check if meal is in the menu for the day
    if (!isMealAvailable(req.body.mealId)) return res.status(422).send({ error: 'Meal is unavailable' });

    const trimmedData = trimValues(req.body);
    // update date
    trimmedData.updated = moment().format();
    // real userId to be gotten from decoded token
    trimmedData.userId = 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';

    const oldOrder = ordersDB[itemIndex];

    // update db
    ordersDB[itemIndex] = { ...oldOrder, ...trimmedData };

    const order = Orders.getOrderObject(ordersDB[itemIndex]);

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

    ordersDB.splice(itemIndex, 1);

    return res.status(204).send();
  }

  /**
   * Generated Order Object to be Returned as Response
   * @method getOrderObject
   * @memberof Orders
   * @param {object} order
   * @returns {object} JSON object
   */
  static getOrderObject(order) {
    const newOrder = { ...order };

    // get menu from menuDB through menuId and replace ids with real meals
    const mealObj = menuDB.find(menu => menu.menuId === newOrder.menuId);

    newOrder.meal = mealObj;

    return newOrder;
  }
}

export default Orders;
