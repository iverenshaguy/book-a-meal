import { push } from 'connected-react-router';

let updateOrder;

/**
 * Refreshes Order Page to update order status
 * @function reloadOrderPage
 * @param {func} dispatch
 * @param {string} route
 * @returns {void}
 */
const reloadOrderPage = (dispatch, route) => {
  clearTimeout(updateOrder);

  updateOrder = setTimeout(() => {
    dispatch(push(route));
  }, process.env.EXPIRY);
};

export default reloadOrderPage;
