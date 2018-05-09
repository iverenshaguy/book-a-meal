import moment from 'moment';
import db from '../models';
import mealsDB from '../../data/meals.json';
import ordersDB from '../../data/orders.json';
import orderItemsDB from '../../data/orderItems.json';
import errors from '../../data/errors.json';
import GetItems from '../middlewares/GetItems';
import isOrderExpired from '../helpers/isOrderExpired';
import createMealOrder from '../helpers/createMealOrder';
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
  static async create(req, res) {
    const orderItems = createMealOrder(req.body.meals);
    req.body.meals = removeDuplicates(req.body.meals);
    req.body.userId = req.userId;

    const newOrder = await db.Order.create(req.body, { include: [db.User] })
      .then(async (order) => {
        const promises = Orders.addMeals(order, orderItems);

        await Promise.all(promises);
        await Orders.getMealsObject(order);

        return order;
      });

    return res.status(201).send(newOrder);
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
  static async update(req, res) {
    if (!Object.values(req.body).length) return res.status(422).send({ error: errors.empty });

    const { orderId } = req.params;

    const order = await db.Order.findOne({ where: { orderId, userId: req.userId } });
    if (!order) return res.status(404).send({ error: errors[404] });

    const isExpired = await isOrderExpired(orderId);
    if (isExpired) return res.status(422).send({ error: 'Order is expired' });

    const updatedOrder = await order.update({ ...order, ...req.body }).then(async () => {
      if (req.body.meals) {
        const orderItems = createMealOrder(req.body.meals);
        await order.setMeals([]);
        const promises = Orders.addMeals(order, orderItems);

        await Promise.all(promises);
      }

      await Orders.getMealsObject(order);
      return order;
    });

    return res.status(200).send(updatedOrder);
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

    if (isOrderExpired(orderId)) return res.status(422).send({ error: 'Order is expired' });

    ordersDB.splice(itemIndex, 1);

    return res.status(204).send();
  }

  /**
   * Adds meas to order-meal join table
   * @method addMeals
   * @memberof Orders
   * @param {object} order
   * @param {array} mealItems
   * @returns {object} JSON object
   */
  static addMeals(order, mealItems) {
    return mealItems.map(item =>
      order.addMeal(item.mealId, { through: { quantity: item.quantity } }).then(() => {
        Notifications.create({
          menuId: null,
          userId: getMealOwner(item.mealId),
          orderId: item.orderId,
          message: 'Your menu was just ordered'
        });
      }));
  }

  /**
   * Generated Order Object to be Returned as Response
   * @method getMealsObject
   * @memberof Orders
   * @param {object} order
   * @returns {object} JSON object
   */
  static async getMealsObject(order) {
    order.dataValues.meals = await order.getMeals({
      attributes: ['mealId', 'title', 'imageURL', 'description', 'forVegetarians', 'price'],
      joinTableAttributes: ['quantity']
    });
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
