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
   * @returns {nothing} returns nothing
   */
  static startOrderProcess(order) {
    // expiry is 15 minutes
    clearTimeout(updateOrder);

    updateOrder = setTimeout(() => {
      order.reload().then(() => {
        if (order.status !== 'canceled') {
          order.update({ status: 'pending' }).then(() => order);
        }
      });
    }, process.env.EXPIRY);
  }
}

export default Orders;
