/**
 * @function getOrderItem
 * @param {string} id
 * @param {array} orders array of order items
 * @returns {object} order item
 */
const getOrderItem = (id, orders) => (orders.find(order => order.id === id));

export default { getOrderItem };
