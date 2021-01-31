/**
 * Returns total price made from a particular order
 * @function calculateCashEarnedFromOrder
 * @param {array} meals
 * @returns {number} Cash Earned
 */
const calculateCashEarnedFromOrder = meals => meals
  .reduce((total, item) => total + (item.price * item.quantity), 0);

export default calculateCashEarnedFromOrder;
