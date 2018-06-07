import moment from 'moment';
import sequelize, { Op } from 'sequelize';
import db from '../models';
import errors from '../../data/errors.json';
import orderEmitter from '../events/Orders';

/**
 * @exports
 * @class Orders
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
      Orders.getCustomersOrders(req, res);
  }

  /**
   * Returns Users' Orders
   * @method getCustomersOrders
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * if date is provided in query, get orders that belong
   * to user and were created on that date
   */
  static async getCustomersOrders(req, res) {
    let orders = await db.Order.findAll({
      where: { userId: req.userId },
      include: [{
        model: db.Meal,
        as: 'meals',
        attributes: [['mealId', 'id'], 'title', 'imageURL', 'description', 'vegetarian', 'price'],
        include: [{
          model: db.User,
          attributes: ['businessName', 'businessAddress', 'businessPhoneNo', 'email'],
          as: 'caterer'
        }],
        paranoid: false,
      }]
    });

    orders = orders.map((order) => {
      Orders.mapQuantityToMeal(order);
      return Orders.getOrderObject(order);
    });

    const pendingOrders = Orders.pendingOrders(req.role, orders);

    return res.status(200).json({ orders, pendingOrders });
  }

  /**
   * Returns Caterer's Orders
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
    let where = { status: { [Op.not]: 'started' } };

    if (req.query.date) {
      where = {
        [Op.and]: [
          { status: { [Op.not]: 'started' } },
          sequelize.where(sequelize.fn('DATE', sequelize.col('Order.createdAt')), req.query.date)
        ]
      };
    }

    let orders = await db.Order.findAll({
      where,
      include: [
        { model: db.User, as: 'customer', attributes: ['firstname', 'lastname', 'email'] },
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageURL', 'description', 'vegetarian', 'price'],
          paranoid: false,
          include: [{
            model: db.User,
            as: 'caterer',
            where: { userId: req.userId },
            attributes: []
          }]
        }]
    });

    orders = orders.map((order) => {
      Orders.mapQuantityToMeal(order);
      return Orders.getOrderObject(order);
    });

    const totalCashEarned = Orders.totalCashEarned(orders);
    const pendingOrders = Orders.pendingOrders(req.role, orders);

    return res.status(200).json({ orders, totalCashEarned, pendingOrders });
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
   * emits create event after creation
   */
  static async create(req, res) {
    req.body.meals = [...(new Set(req.body.meals))];
    req.body.userId = req.userId;

    const newOrder = await db.Order.create(req.body, { include: [{ model: db.User, as: 'customer' }] })
      .then(async (order) => {
        const promises = Orders.addMeals(order, req.body.meals);

        await Promise.all(promises);
        await Orders.getOrderMeals(order);

        orderEmitter.emit('create', order, req.userId);

        Orders.mapQuantityToMeal(order);

        return Orders.getOrderObject(order);
      });

    return res.status(201).json(newOrder);
  }

  /**
   * Updates an order
   * @method update
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async update(req, res) {
    const { orderId } = req.params;
    const order = await db.Order.findOne({ where: { orderId, userId: req.userId } });

    if (!order) return res.status(404).json({ error: errors[404] });
    if (order.status === 'pending') return res.status(400).json({ error: 'Order is being processed and cannot be edited' });
    if (order.status === 'canceled') return res.status(400).json({ error: 'Order has been canceled' });
    if (order.status === 'delivered') return res.status(400).json({ error: 'Order is expired' });

    const updatedOrder = await order.update({ ...order, ...req.body }).then(async () => {
      if (req.body.meals) {
        await order.setMeals([]);

        const promises = Orders.addMeals(order, req.body.meals);
        await Promise.all(promises);
      }

      await Orders.getOrderMeals(order);

      orderEmitter.emit('create', order);

      Orders.mapQuantityToMeal(order);

      return Orders.getOrderObject(order);
    });

    return res.status(200).json(updatedOrder);
  }

  /**
   * Marks Caterer's Order as Delievered
   * @method deliver
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async deliver(req, res) {
    const { orderId } = req.params;
    const { userId } = req;

    const order = await db.Order.findOne({
      where: { orderId, status: 'pending' },
      include: [
        {
          model: db.Meal,
          as: 'meals',
          attributes: [],
          where: { userId }
        }
      ]
    });

    if (!order) return res.status(404).json({ error: errors[404] });

    const meals = await order.getMeals({ where: { userId } });

    const promises = meals.map((meal) => {
      meal.OrderItem.delivered = req.body.delivered;

      return meal.OrderItem.save();
    });

    await Promise.all(promises);
    await Orders.getOrderMeals(order);

    orderEmitter.emit('deliver', order);

    Orders.mapQuantityToMeal(order);

    return res.status(200).json(Orders.getOrderObject(order));
  }

  /**
   * Gets total caterer profit
   * @method totalCashEarned
   * @memberof Orders
   * @param {array} orders
   * @returns {number} Cash Earned
   */
  static totalCashEarned(orders) {
    return orders.reduce((totalProfit, order) => {
      const profitPerOrder = order.meals.reduce((total, meal) => {
        if (!meal.dataValues.delivered) return total + 0;

        const orderItemPrice = parseInt(meal.dataValues.price, 10) *
        parseInt(meal.dataValues.quantity, 10);
        return total + orderItemPrice;
      }, 0);

      return profitPerOrder + totalProfit;
    }, 0);
  }

  /**
   * Gets number of pending orders
   * @method pendingOrders
   * @memberof Orders
   * @param {string} role
   * @param {array} orders
   * @returns {number} Pending Orders
   * Checks the first caterers meal to see if it is delivered
   * Delivering one meal delivers all meals
   * One undelivered meal means all caterers meals are undelievered
   */
  static pendingOrders(role, orders) {
    if (role === 'caterer') {
      return orders.reduce((totalPending, order) => {
        if (!order.meals[0].dataValues.delivered) return totalPending + 1;
        return totalPending + 0;
      }, 0);
    }

    return orders.reduce((total, order) => {
      if (order.status === 'pending' || order.status === 'started') {
        return total + 1;
      }

      return total + 0;
    }, 0);
  }

  /**
   * Adds meals to order-meal join table
   * @method addMeals
   * @memberof Orders
   * @param {object} order
   * @param {array} mealItems
   * @returns {object} JSON object
   */
  static addMeals(order, mealItems) {
    return mealItems.map(item =>
      order.addMeal(item.mealId, { through: { quantity: item.quantity } }).then(() => order));
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
      attributes: [['mealId', 'id'], 'title', 'imageURL', 'description', 'vegetarian', 'price'],
      joinTableAttributes: ['quantity', 'delivered'],
      paranoid: false
    });
  }

  /**
   * Maps Orders to Show Order Quantity and Item Delivery Status
   * instead of including OrderItem Association
   * @method mapQuantityToMeal
   * @memberof Orders
   * @param {object} order
   * @returns {object} JSON object
   */
  static mapQuantityToMeal(order) {
    order.dataValues.meals = order.dataValues.meals.map((meal) => {
      meal.dataValues.quantity = meal.OrderItem.quantity;
      meal.dataValues.delivered = meal.OrderItem.delivered;
      delete meal.dataValues.OrderItem;
      return meal;
    });
  }

  /**
   * Gets order object for created and updated order
   * @method getOrderObject
   * @memberof Controller
   * @param {object} order
   * @returns {object} Order object
   */
  static getOrderObject(order) {
    return {
      id: order.getDataValue('orderId'),
      deliveryAddress: order.getDataValue('deliveryAddress'),
      deliveryPhoneNo: order.getDataValue('deliveryPhoneNo'),
      status: order.getDataValue('status'),
      customer: order.getDataValue('customer') ? order.getDataValue('customer') : undefined,
      createdAt: moment(order.getDataValue('createdAt')).format(),
      updatedAt: moment(order.getDataValue('updatedAt')).format(),
      meals: order.dataValues.meals
    };
  }
}

export default Orders;
