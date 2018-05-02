import uuidv4 from 'uuid/v4';
import moment from 'moment';
import orderItemsDB from '../../data/orderItems.json';
import Notifications from './Notifications';
import getMealOwner from '../helpers/getMealOwner';

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
    mealItems.forEach((mealId) => {
      const item = {};
      item.id = uuidv4();
      item.orderId = orderId;
      item.mealId = mealId;

      // generate created date
      item.created = moment().format();
      item.updated = moment().format();

      // update DB
      orderItemsDB.push(item);

      // push to notifications table
      // Caterer's for when an order is made
      Notifications.create({
        menuId: null,
        userId: getMealOwner(item.mealId),
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
    // delete former order items in db
    OrderItems.delete(orderId);

    // readd new items against orderId
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
    // get all items in DB for the order
    const items = orderItemsDB.filter(item => item.orderId === orderId);

    items.forEach((item) => {
      // find the items index in the DB
      const index = orderItemsDB.findIndex(order => order.orderId === item.orderId);

      // remove the item
      orderItemsDB.splice(index, 1);
    });
  }
}

export default OrderItems;
