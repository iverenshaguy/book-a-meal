import NotificationHandler from './Notifications';
import mapCaterersOrder from '../helpers/mapCaterersOrder';

let updateOrder;

/**
 * Order event handlers
 * @exports
 * @class Orders
 */
class Orders {
  /**
   * Starts order process by updating order status to pending
   * @method startOrderProcess
   * @memberof Orders
   * @param {object} order
   * @param {string} userId
   * @returns {void}
   */
  static startOrderProcess(order, userId) {
    // expiry is 15 minutes
    clearTimeout(updateOrder);

    updateOrder = setTimeout(() => order.reload().then(() => {
      if (order.status !== 'canceled') {
        order.update({ status: 'pending' }).then(async () => {
          const mappedOrder = await mapCaterersOrder(order);

          return NotificationHandler.notifyCaterer(mappedOrder, userId);
        });
      }
    }), process.env.EXPIRY);
  }

  /**
   * Automatically marks Order as delivered if all meals are delivered
   * @method markOrderAsDelivered
   * @memberof Orders
   * @param {object} order
   * @returns {void}
   */
  static markOrderAsDelivered(order) {
    order.reload();

    order.getMeals().then((meals) => {
      let delivered = true;

      meals.forEach((meal) => {
        if (!meal.OrderItem.delivered) delivered = false;
      });

      if (!delivered) {
        order.update({ status: 'pending' }).then(() => order);
      }

      if (delivered) {
        order.update({ status: 'delivered' }).then(() => order);
      }
    });
  }
}

export default Orders;
