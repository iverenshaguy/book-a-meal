import moment from 'moment';
import sequelize, { Op } from 'sequelize';
import db from '../models';
import errors from '../../data/errors.json';
import orderEmitter from '../events/Orders';
import Pagination from '../utils/Pagination';
import Users from './Users';
import { sqlOptions, customerPendingOrdersSql, catererCashEarnedSql, catererPendingOrdersSql } from '../helpers/queries';

/**
 * @exports
 * @class Orders
 */
class Orders {
  /**
   * Creates a new order item
   * @method create
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * notification is created when an order is made
   * order is expired and cant be canceled or updated after set time of ordering
   * emits create event after creation
   */
  static async create(req, res) {
    const { deliveryAddress, deliveryPhoneNo } = req.body;
    const orderBody = {
      meals: [...(new Set(req.body.meals))],
      userId: req.userId,
      deliveryAddress,
      deliveryPhoneNo
    };

    const newOrder = await db.Order.create(orderBody, { include: [{ model: db.User, as: 'customer' }] })
      .then(async (order) => {
        const promises = Orders.addMeals(order, req.body.meals);

        await Promise.all(promises);
        await Orders.getOrderMeals(order);
        await Users.updateCustomerContact(req.userId, { deliveryAddress, deliveryPhoneNo });

        orderEmitter.emit('create', order, req.userId);

        Orders.mapQuantityToMeal(order);

        return Orders.getOrderObject(order);
      });

    return res.status(201).json(newOrder);
  }

  /**
   * Updates an existing order
   * @method update
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async update(req, res) {
    const { order } = req;
    const { deliveryAddress, deliveryPhoneNo } = order;
    const updatedOrder = await order.update({ ...order, ...req.body }).then(async () => {
      if (req.body.meals) {
        await order.setMeals([]);

        const promises = Orders.addMeals(order, req.body.meals);
        await Promise.all(promises);
      }

      await Orders.getOrderMeals(order);

      if (req.body.status !== 'canceled') {
        await Users.updateCustomerContact(req.userId, { deliveryAddress, deliveryPhoneNo });
      }

      orderEmitter.emit('create', order);

      Orders.mapQuantityToMeal(order);

      return Orders.getOrderObject(order);
    });

    return res.status(200).json(updatedOrder);
  }

  /**
   * Checks Order status before updating order
   * @method checkOrderStatus
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @param {func} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static async checkOrderStatus(req, res, next) {
    const { orderId } = req.params;
    const order = await db.Order.findOne({ where: { orderId, userId: req.userId } });

    if (!order) return res.status(404).json({ error: errors[404] });
    if (order.status === 'pending') return res.status(400).json({ error: 'Order is being processed and cannot be edited' });
    if (order.status === 'canceled') return res.status(400).json({ error: 'Order has been canceled' });
    if (order.status === 'delivered') return res.status(400).json({ error: 'Order is expired' });

    req.order = order;
    return next();
  }

  /**
   * Marks Caterer's Meals in Order as Delievered
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
        { model: db.User, as: 'customer', attributes: ['firstname', 'lastname', 'email'] },
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          paranoid: false,
          include: [{
            model: db.User,
            as: 'caterer',
            where: { userId },
            attributes: []
          }],
          required: true,
          duplicating: false
        },
      ]
    });

    if (!order) return res.status(404).json({ error: errors[404] });

    const promises = order.get().meals.map((meal) => {
      meal.OrderItem.delivered = req.body.delivered;

      return meal.OrderItem.save();
    });

    await Promise.all(promises);

    orderEmitter.emit('deliver', order);

    Orders.mapQuantityToMeal(order);

    const returnedOrder = await Orders.getOrderObject(order);

    return res.status(200).json(returnedOrder);
  }

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
   * Returns Customers' Orders
   * @method getCustomersOrders
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * if date is provided in query, get orders that belong
   * to user and were created on that date
   * Total Pending Orders maps to all items so it is gotten from first returned item
   * Get order by day, if no date is given, gets all orders in app with
   * total order summary. If date is given, gets orders for that day with
   * order summary for that day
   */
  static async getCustomersOrders(req, res) {
    const paginate = new Pagination(req.query.page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();
    let where = { userId: req.userId };

    if (req.query.date) {
      where = { [Op.and]: [{ userId: req.userId }, sequelize.where(sequelize.fn('DATE', sequelize.col('Order.createdAt')), req.query.date)] };
    }

    const pendingOrders = await db.sequelize.query(customerPendingOrdersSql(req), sqlOptions);

    const data = await db.Order.findAndCountAll({
      where,
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          include: [{
            model: db.User,
            attributes: ['businessName', 'address', 'phoneNo', 'email'],
            as: 'caterer'
          }],
          paranoid: false,
        },
        { model: db.User, as: 'customer', attributes: [] }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(Orders.getOrdersResponse('customer', req.query.date, data, paginate, pendingOrders));
  }

  /**
   * Returns Caterer's Orders
   * @method getCaterersOrders
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * Find orders containing meals which belong to the caterer
   * extract order details using OrderItem join table
   * Map totalPendingOrders, totalCashEarned and totalOrders to object.
   * Get order by day, if no date is given, gets all orders in app with
   * total order summary. If date is given, gets orders for that day with
   * order summary for that day
   */
  static async getCaterersOrders(req, res) {
    const paginate = new Pagination(req.query.page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();
    const { date } = req.query;
    let where = { [Op.and]: [{ status: { [Op.not]: 'started' } }, { status: { [Op.not]: 'canceled' } }] };

    if (date) {
      where = {
        [Op.and]: [
          { status: { [Op.not]: 'started' } },
          { status: { [Op.not]: 'canceled' } },
          sequelize.where(sequelize.fn('DATE', sequelize.col('Order.createdAt')), date)
        ]
      };
    }

    const cashEarned = await db.sequelize.query(catererCashEarnedSql(req, date), sqlOptions);

    const pendingOrders = await db.sequelize.query(catererPendingOrdersSql(req, date), sqlOptions);

    const data = await db.Order.findAndCountAll({
      where,
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          include: [{
            model: db.User,
            as: 'caterer',
            where: { userId: req.userId },
            attributes: []
          }],
          paranoid: false,
        },
        { model: db.User, as: 'customer', attributes: ['firstname', 'lastname', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(Orders.getOrdersResponse('caterer', req.query.date, data, paginate, pendingOrders, cashEarned));
  }

  /**
   * Returns Order Details for an order
   * @method getSingleOrder
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {(function|object)} Function next() or JSON object
   */
  static getSingleOrder(req, res) {
    const { role } = req;

    return role === 'caterer' ?
      Orders.getSingleCatererOrder(req, res) :
      Orders.getSingleCustomerOrder(req, res);
  }

  /**
   * Returns Customer Order Details
   * @method getSingleCustomerOrder
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getSingleCustomerOrder(req, res) {
    const order = await db.Order.findOne({
      where: { userId: req.userId, orderId: req.params.orderId },
      include: [
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          include: [{
            model: db.User,
            attributes: ['businessName', 'address', 'phoneNo', 'email'],
            as: 'caterer'
          }],
          paranoid: false,
        }
      ]
    });

    if (!order) return res.status(404).json({ error: errors[404] });

    Orders.mapQuantityToMeal(order);

    return res.status(200).json(Orders.getOrderObject(order));
  }

  /**
   * Returns Caterer's Order Details
   * @method getSingleCatererOrder
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getSingleCatererOrder(req, res) {
    const where = {
      [Op.and]: [{ status: { [Op.not]: 'started' } }, { status: { [Op.not]: 'canceled' } }],
      orderId: req.params.orderId
    };

    const order = await db.Order.findOne({
      where,
      include: [
        { model: db.User, as: 'customer', attributes: ['firstname', 'lastname', 'email'] },
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          paranoid: false,
          include: [{
            model: db.User,
            as: 'caterer',
            where: { userId: req.userId },
            attributes: []
          }],
          required: true,
          duplicating: false
        },
      ]
    });

    if (!order) return res.status(404).json({ error: errors[404] });

    Orders.mapQuantityToMeal(order);

    return res.status(200).json(Orders.getOrderObject(order));
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
      order.addMeal(item.mealId, {
        through: { quantity: item.quantity }
      }).then(() => order));
  }

  /**
   * Generates Order Meals Array to be Returned as Response
   * @method getOrderMeals
   * @memberof Orders
   * @param {object} order
   * @returns {object} JSON object
   */
  static async getOrderMeals(order) {
    const options = {
      attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
      joinTableAttributes: ['quantity', 'delivered'],
      paranoid: false,
      required: true,
      order: [['createdAt', 'DESC']]
    };

    order.get().meals = await order.getMeals(options);
  }

  /**
   * Gets order object for created and updated order
   * @method getOrderObject
   * @memberof Controller
   * @param {object} order
   * @returns {object} Order object
   * If order has a customer property, order is for a caterer
   * order status for caterer is Delivered when all his meals
   * have been delivered even if other caterers havent deliverd
   */
  static getOrderObject(order) {
    const caterersOrderStatus = order.get().meals[0].get().delivered ? 'delivered' : order.getDataValue('status');
    const status = order.getDataValue('customer') ? caterersOrderStatus : order.getDataValue('status');

    return {
      id: order.getDataValue('orderId'),
      deliveryAddress: order.getDataValue('deliveryAddress'),
      deliveryPhoneNo: order.getDataValue('deliveryPhoneNo'),
      status,
      customer: order.getDataValue('customer') ? order.getDataValue('customer') : undefined,
      createdAt: moment(order.getDataValue('createdAt')).format(),
      updatedAt: moment(order.getDataValue('updatedAt')).format(),
      meals: order.get().meals
    };
  }

  /**
   * Get Orders Response
   * @method getOrdersResponse
   * @memberof Orders
   * @param {string} type
   * @param {string} date date query
   * @param {object} data
   * @param {object} paginate
   * @param {integer} pendingOrders
   * @param {float} cashEarned
   * @returns {object} JSON object
   */
  static getOrdersResponse(type, date, data, paginate, pendingOrders, cashEarned) {
    const url = '/orders';
    const extraQuery = date ? `date=${date}` : '';
    const orders = Orders.mapOrders(data.rows);

    return {
      orders,
      totalOrders: data.count,
      pendingOrders: parseInt(pendingOrders[0].count, 10),
      totalCashEarned: type === 'caterer' ? (parseFloat(cashEarned[0].sum) || 0) : undefined,
      metadata: paginate.getPageMetadata(data.count, url, extraQuery)
    };
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
    order.get().meals = order.get().meals.map((meal) => {
      meal.get().quantity = meal.OrderItem.quantity;
      meal.get().delivered = meal.OrderItem.delivered;
      delete meal.get().OrderItem;
      return meal;
    });
  }

  /**
   * Maps Orders to get full order object
   * @method mapQuantityToMeal
   * @memberof Orders
   * @param {array} orders
   * @returns {object} JSON object
   */
  static mapOrders(orders) {
    return orders.map((order) => {
      Orders.mapQuantityToMeal(order);
      return Orders.getOrderObject(order);
    });
  }
}

export default Orders;
