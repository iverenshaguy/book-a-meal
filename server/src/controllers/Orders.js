import db from '../models';
import errors from '../../data/errors.json';
import orderEmitter from '../events/Orders';
import createMealOrder from '../helpers/createMealOrder';

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
    const orders = await db.Order.findAll({
      where: { userId: req.userId },
      attributes: [['orderId', 'id'], 'deliveryAddress', 'deliveryPhoneNo', 'status', 'createdAt', 'updatedAt'],
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

    orders.map(order => Orders.mapQuantityToMeal(order));

    return res.status(200).json({ orders });
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
    const orders = await db.Order.findAll({
      attributes: [['orderId', 'id'], 'deliveryAddress', 'deliveryPhoneNo', 'status', 'createdAt', 'updatedAt'],
      include: [
        {
          model: db.User,
          as: 'customer',
          attributes: ['firstname', 'lastname', 'email']
        },
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageURL', 'description', 'vegetarian', 'price'],
          paranoid: false,
          include: [{
            model: db.User,
            as: 'caterer',
            where: { userId },
            attributes: []
          }]
        }]
    });

    orders.map(order => Orders.mapQuantityToMeal(order));

    return res.status(200).json(orders);
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
    const orderItems = createMealOrder(req.body.meals);
    req.body.meals = [...(new Set(req.body.meals))];
    req.body.userId = req.userId;

    const newOrder = await db.Order.create(req.body, { include: [{ model: db.User, as: 'customer' }] })
      .then(async (order) => {
        const promises = Orders.addMeals(order, orderItems);

        await Promise.all(promises);
        await Orders.getOrderMeals(order);

        orderEmitter.emit('create', order);

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
   * notification is created on order update
   */
  static async update(req, res) {
    const { orderId } = req.params;
    const order = await db.Order.findOne({ where: { orderId, userId: req.userId } });

    if (!order) return res.status(404).json({ error: errors[404] });
    if (order.status === 'canceled') return res.status(400).json({ error: 'Order has been canceled' });
    if (order.status === 'delivered') return res.status(400).json({ error: 'Order is expired' });

    delete req.body.orderId;

    const updatedOrder = await order.update({ ...order, ...req.body }).then(async () => {
      if (req.body.meals) {
        const orderItems = createMealOrder(req.body.meals);
        await order.setMeals([]);

        const promises = Orders.addMeals(order, orderItems);
        await Promise.all(promises);
      }

      await Orders.getOrderMeals(order);

      Orders.mapQuantityToMeal(order);

      return Orders.getOrderObject(order);
    });

    return res.status(200).json(updatedOrder);
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
      joinTableAttributes: ['quantity'],
      paranoid: false
    });
  }

  /**
   * Maps Orders to Show Order Quantity
   * instead of including OrderItem Association
   * @method mapQuantityToMeal
   * @memberof Orders
   * @param {object} order
   * @returns {object} JSON object
   */
  static mapQuantityToMeal(order) {
    order.dataValues.meals = order.dataValues.meals.map((meal) => {
      meal.dataValues.quantity = meal.OrderItem.quantity;
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
      createdAt: order.getDataValue('createdAt'),
      updatedAt: order.getDataValue('updatedAt'),
      meals: order.dataValues.meals
    };
  }
}

export default Orders;
