import NotificationEventHandler from './NotificationEventHandler';
import mapCaterersOrder from '../helpers/mapCaterersOrder';

let updateOrder;

/**
 * Order event handlers
 * @exports
 * @class OrderEventHandler
 */
class OrderEventHandler {
  /**
   * Starts order process by updating order status to pending
   * @method startOrderProcess
   * @memberof OrderEventHandler
   * @param {object} order
   * @param {string} userId
   * @returns {void}
   * expiry is 15 minutes
   */
  static startOrderProcess(order, userId) {
    clearTimeout(updateOrder);

    updateOrder = setTimeout(() => order.reload().then(() => {
      if (order.status !== 'canceled') {
        order.update({ status: 'pending' }).then(async () => {
          const mappedOrder = await mapCaterersOrder(order);

          return NotificationEventHandler.catererOrder(mappedOrder, userId);
        });
      }
    }), process.env.EXPIRY);
  }

  /**
   * Automatically marks Order as delivered if all meals are delivered
   * @method markOrderAsDelivered
   * @memberof OrderEventHandler
   * @param {object} order
   * @returns {void}
   */
  static async markOrderAsDelivered(order) {
    order.reload();

    await order.getMeals().then(async (meals) => {
      let delivered = true;

      meals.forEach((meal) => {
        if (!meal.OrderItem.delivered) delivered = false;
      });

      if (!delivered) await order.update({ status: 'pending' }).then(() => order);

      if (delivered) {
        await order.update({ status: 'delivered' }).then(() => order);

        NotificationEventHandler.orderSuccess(order, meals);
      }
    });
  }
}

export default OrderEventHandler;
