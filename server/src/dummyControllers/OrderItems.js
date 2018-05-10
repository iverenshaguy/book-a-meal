import uuidv4 from 'uuid/v4';
import moment from 'moment';
import orderItemsDB from '../../data/orderItems.json';
import Notifications from './Notifications';
import createMealOrder from '../helpers/createMealOrder';

/**
 * @exports
 * @class OrderItems
 * @extends Controller
 */
class OrderItems {
  /**
   * Creates a new item
   * @method create
   * @memberof OrderItems
   * @param {string} orderId
   * @param {arr} mealItems
   * @returns {(function|object)} Function next() or JSON object
   */
  static create(orderId, mealItems) {
    const orderItems = createMealOrder(mealItems);
    orderItems.forEach((order) => {
      const item = {};
      item.id = uuidv4();
      item.orderId = orderId;
      item.mealId = order.mealId;
      item.quantity = order.quantity;

      item.createdAt = moment().format();
      item.updatedAt = moment().format();

      orderItemsDB.push(item);

      Notifications.create({
        menuId: null,
        // userId: getMealOwner(item.mealId),
        orderId,
        message: 'Your menu was just ordered'
      });
    });
  }

  /**
   * Creates a new item
   * @method update
   * @memberof OrderItems
   * @param {string} orderId
   * @param {array} mealItems
   * @returns {(function|object)} Function next() or JSON object
   */
  static update(orderId, mealItems) {
    OrderItems.delete(orderId);

    return OrderItems.create(orderId, mealItems);
  }

  /**
   * Deletes an existing item
   * @method delete
   * @memberof OrderItems
   * @param {string} orderId
   * @returns {(function|object)} Function next() or JSON object
   */
  static delete(orderId) {
    const items = orderItemsDB.filter(item => item.orderId === orderId);

    items.forEach((item) => {
      const index = orderItemsDB.findIndex(order => order.orderId === item.orderId);

      orderItemsDB.splice(index, 1);
    });
  }
}

export default OrderItems;
