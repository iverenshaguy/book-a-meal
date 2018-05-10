import db from '../models';
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
  static async getUsersOrders(req, res) {
    const ordersArr = await db.Order.findAll({
      where: { userId: req.userId },
      include: [{
        model: db.Meal,
        as: 'meals',
      }]
    });

    Orders.getMappedOrders(ordersArr);

    return GetItems.items(req, res, ordersArr, 'orders');
  }

  /**
   * Returns Users' Orders
   * @method getCaterersOrders
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * find meals which belong to the caterer
   * for each mealId, find the order(s) that correspond to it
   * extract order details using OrderItem join table
   */
  static async getCaterersOrders(req, res) {
    const { userId } = req;
    const ordersObj = {};
    const orderItems = [];
    const meals = await db.Meal.findAll({ where: { userId } });
    const promises = meals.map(async (meal) => {
      await db.Order.findAll({
        include: [{
          model: db.Meal,
          as: 'meals',
          where: { mealId: meal.mealId },
        }]
      }).then(order => orderItems.push(...order));
    });

    await Promise.all(promises);

    orderItems.forEach((item) => {
      if (ordersObj[item.orderId]) {
        ordersObj[item.orderId].meals.push(...item.meals);
        return;
      }

      ordersObj[item.orderId] = item;
    });

    const orders = Object.values(ordersObj);

    Orders.getMappedOrders(orders);

    return GetItems.items(req, res, orders, 'orders');
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
        await Orders.getOrderMeals(order);

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

      await Orders.getOrderMeals(order);
      return order;
    });

    return res.status(200).send(updatedOrder);
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
   * Generates Order Meals Array to be Returned as Response
   * @method getOrderMeals
   * @memberof Orders
   * @param {object} order
   * @returns {object} JSON object
   */
  static async getOrderMeals(order) {
    order.dataValues.meals = await order.getMeals({
      attributes: ['mealId', 'title', 'imageURL', 'description', 'forVegetarians', 'price'],
      joinTableAttributes: ['quantity']
    });
  }

  /**
   * Maps Orders to Show Order Quantity
   * instead of including OrderItem Association
   * @method getMappedOrders
   * @memberof Orders
   * @param {object} orders
   * @returns {object} JSON object
   */
  static getMappedOrders(orders) {
    orders.forEach((item) => {
      item.dataValues.meals = item.meals.map((meal) => {
        meal.dataValues.quantity = meal.OrderItem.quantity;
        delete meal.dataValues.OrderItem;
        return meal;
      });
    });
  }
}

export default Orders;
