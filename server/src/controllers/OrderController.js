import moment from 'moment';
import sequelize, { Op } from 'sequelize';
import models from '../models';
import errors from '../../lib/errors.json';
import OrderEventEmitter from '../eventEmitters/OrderEventEmitter';
import Pagination from '../utils/Pagination';
import Users from './UserController';
import { sqlOptions, customerPendingOrdersSql, catererCashEarnedSql, catererPendingOrdersSql } from '../helpers/queries';

/**
 * @exports
 * @class Orders
 */
class OrderController {
  /**
   * Creates a new order item
   * @method createOrder
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * notification is created when an order is made
   * order is expired and cant be canceled or updated after set time of ordering
   * emits create event after creation
   */
  static async createOrder(req, res) {
    const { userId, body: { deliveryAddress, deliveryPhoneNo, meals } } = req;
    const orderBody = {
      userId,
      meals: [...(new Set(meals))],
      deliveryAddress,
      deliveryPhoneNo
    };

    const newOrder = await models.Order.create(orderBody, { include: [{ model: models.User, as: 'customer' }] })
      .then(async (order) => {
        const promises = OrderController.addMealsToOrder(order, meals);

        await Promise.all(promises);
        await OrderController.getOrderMeals(order);
        await Users.updateCustomerContact(userId, { deliveryAddress, deliveryPhoneNo });

        OrderEventEmitter.emit('create', order, userId);

        OrderController.mapQuantityToMeal(order);

        return OrderController.getOrderObject(order);
      });

    return res.status(201).json(newOrder);
  }

  /**
   * Updates an existing order
   * @method updateOrder
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async updateOrder(req, res) {
    const { userId, body: { order, meals, status } } = req;
    const { deliveryAddress, deliveryPhoneNo } = order;
    const updatedOrder = await order.update({ ...order, ...req.body }).then(async () => {
      if (meals) {
        await order.setMeals([]);

        const promises = OrderController.addMealsToOrder(order, meals);
        await Promise.all(promises);
      }

      await OrderController.getOrderMeals(order);

      if (status !== 'canceled') {
        await Users.updateCustomerContact(userId, { deliveryAddress, deliveryPhoneNo });
      }

      OrderEventEmitter.emit('create', order);

      OrderController.mapQuantityToMeal(order);

      return OrderController.getOrderObject(order);
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
    const { params: { orderId }, userId } = req;
    const order = await models.Order.findOne({ where: { orderId, userId } });

    if (!order) return res.status(404).json({ error: errors[404] });
    if (order.status === 'pending') return res.status(400).json({ error: 'Order is being processed and cannot be edited' });
    if (order.status === 'canceled') return res.status(400).json({ error: 'Order has been canceled' });
    if (order.status === 'delivered') return res.status(400).json({ error: 'Order is expired' });

    req.body.order = order;
    return next();
  }

  /**
   * Marks Caterer's Meals in Order as Delievered
   * @method deliverOrder
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async deliverOrder(req, res) {
    const { userId, body: { delivered }, params: { orderId } } = req;

    const order = await models.Order.findOne({
      where: { orderId, status: 'pending' },
      include: [
        { model: models.User, as: 'customer', attributes: ['firstname', 'lastname', 'email'] },
        {
          model: models.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          paranoid: false,
          include: [{
            model: models.User,
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
      meal.OrderItem.delivered = delivered;

      return meal.OrderItem.save();
    });

    await Promise.all(promises);

    await OrderEventEmitter.emit('deliver', order);

    OrderController.mapQuantityToMeal(order);

    const returnedOrder = await OrderController.getOrderObject(order);

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
      OrderController.getCaterersOrders(req, res) :
      OrderController.getCustomersOrders(req, res);
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
    const { userId, query: { date, page } } = req;
    const paginate = new Pagination(page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();

    let where = { userId };

    if (date) {
      where = { [Op.and]: [{ userId }, sequelize.where(sequelize.fn('DATE', sequelize.col('Order.createdAt')), date)] };
    }

    const pendingOrders = await models.sequelize
      .query(customerPendingOrdersSql(userId, date), sqlOptions);

    const ordersData = await models.Order.findAndCountAll({
      where,
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: models.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          include: [{
            model: models.User,
            attributes: ['businessName', 'address', 'phoneNo', 'email'],
            as: 'caterer'
          }],
          paranoid: false,
        },
        { model: models.User, as: 'customer', attributes: [] }
      ],
      order: [['createdAt', 'DESC']]
    });

    const orderDetails = {
      type: 'customer', date, ordersData, paginate, pendingOrders
    };

    return res.status(200).json(OrderController.getOrdersResponse(orderDetails));
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
    const { query: { date, page }, userId } = req;
    const paginate = new Pagination(page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();

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

    const cashEarned = await models.sequelize.query(catererCashEarnedSql(userId, date), sqlOptions);

    const pendingOrders = await models
      .sequelize.query(catererPendingOrdersSql(userId, date), sqlOptions);

    const ordersData = await models.Order.findAndCountAll({
      where,
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: models.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          include: [{
            model: models.User,
            as: 'caterer',
            where: { userId },
            attributes: []
          }],
          paranoid: false,
        },
        { model: models.User, as: 'customer', attributes: ['firstname', 'lastname', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });


    const orderDetails = {
      type: 'caterer', date, ordersData, paginate, pendingOrders, cashEarned
    };

    return res.status(200).json(OrderController.getOrdersResponse(orderDetails));
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
      OrderController.getSingleCatererOrder(req, res) :
      OrderController.getSingleCustomerOrder(req, res);
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
    const { userId, params: { orderId } } = req;

    const order = await models.Order.findOne({
      where: { userId, orderId },
      include: [
        {
          model: models.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          include: [{
            model: models.User,
            attributes: ['businessName', 'address', 'phoneNo', 'email'],
            as: 'caterer'
          }],
          paranoid: false,
        }
      ]
    });

    if (!order) return res.status(404).json({ error: errors[404] });

    OrderController.mapQuantityToMeal(order);

    return res.status(200).json(OrderController.getOrderObject(order));
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
    const { userId, params: { orderId } } = req;

    const where = {
      [Op.and]: [{ status: { [Op.not]: 'started' } }, { status: { [Op.not]: 'canceled' } }],
      orderId
    };

    const order = await models.Order.findOne({
      where,
      include: [
        { model: models.User, as: 'customer', attributes: ['firstname', 'lastname', 'email'] },
        {
          model: models.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
          paranoid: false,
          include: [{
            model: models.User,
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

    OrderController.mapQuantityToMeal(order);

    return res.status(200).json(OrderController.getOrderObject(order));
  }

  /**
   * Adds meals to order-meal join table
   * @method addMealsToOrder
   * @memberof Orders
   * @param {object} order
   * @param {array} mealItems
   * @returns {object} JSON object
   */
  static addMealsToOrder(order, mealItems) {
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
   *
   * Order status is mapped on every Meal in array of returned orders
   */
  static getOrderObject(order) {
    const {
      meals, customer, orderId, deliveryAddress, deliveryPhoneNo, status, createdAt, updatedAt
    } = order.get();

    const caterersOrderStatus = meals[0].get().delivered ? 'delivered' : status;
    const orderStatus = customer !== undefined ? caterersOrderStatus : status;
    const orderCustomer = customer !== undefined ? customer : undefined;

    return {
      meals,
      id: orderId,
      deliveryAddress,
      deliveryPhoneNo,
      status: orderStatus,
      customer: orderCustomer,
      createdAt: moment(createdAt).format(),
      updatedAt: moment(updatedAt).format(),
    };
  }

  /**
   * Get Orders Response
   * @method getOrdersResponse
   * @memberof Orders
   * @param {object} orderDetails
   * @returns {object} JSON object
   */
  static getOrdersResponse(orderDetails) {
    const {
      type, date, ordersData, paginate, pendingOrders, cashEarned
    } = orderDetails;

    const extraQuery = date ? `date=${date}` : '';
    const orders = OrderController.mapOrders(ordersData.rows);

    return {
      orders,
      totalOrders: ordersData.count,
      pendingOrders: parseInt(pendingOrders[0].count, 10),
      totalCashEarned: type === 'caterer' ? (parseFloat(cashEarned[0].sum) || 0) : undefined,
      metadata: paginate.getPageMetadata(ordersData.count, '/orders', extraQuery)
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
    const { meals } = order.get();
    order.get().meals = meals.map((meal) => {
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
      OrderController.mapQuantityToMeal(order);
      return OrderController.getOrderObject(order);
    });
  }
}

export default OrderController;
