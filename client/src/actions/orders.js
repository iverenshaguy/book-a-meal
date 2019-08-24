import { push } from 'connected-react-router';
import { toastr } from 'react-redux-toastr';
import instance from '../config/axios';
import errorHandler from '../helpers/errorHandler';
import { setFetching, unsetFetching } from './isFetching';
import reloadOrderPage from '../utils/reloadOrderPage';
import {
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, SET_DELIVERING, UNSET_DELIVERING,
  ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE, SET_ORDER_WORKING, UNSET_ORDER_WORKING,
  EDIT_ORDER_SUCCESS, EDIT_ORDER_FAILURE, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  RECEIVE_ORDERS_FAILURE, RECEIVE_ORDERS_SUCCESS, RECEIVE_MORE_ORDERS_SUCCESS
} from '../constants/actionTypes';

/**
 * @function fetchOrdersSuccess
 * @param {string} type actionType
 * @param {object} ordersObj (orders, metadata, pendingOrders, totalCashEarned)
 * @returns {object} action
 */
export const fetchOrdersSuccess = (type, ordersObj) => ({
  type,
  payload: ordersObj
});

/**
 * @function fetchOrdersFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const fetchOrdersFailure = error => ({
  type: RECEIVE_ORDERS_FAILURE,
  payload: error
});

/**
 * @function deliverOrderSuccess
 * @param {object} deliveredOrder success response
 * @returns {object} action
 */
export const deliverOrderSuccess = deliveredOrder => ({
  type: DELIVER_ORDER_SUCCESS,
  payload: deliveredOrder
});

/**
 * @function deliverOrderFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const deliverOrderFailure = error => ({
  type: DELIVER_ORDER_FAILURE,
  payload: error
});

/**
 * @function setDelivering
 * @returns {object} action
 */
export const setDelivering = () => ({
  type: SET_DELIVERING
});

/**
 * @function unsetDelivering
 * @returns {object} action
 */
export const unsetDelivering = () => ({
  type: UNSET_DELIVERING
});

/**
 * @function setOrderWorking
 * @returns {object} action
 */
export const setOrderWorking = () => ({
  type: SET_ORDER_WORKING
});

/**
 * @function unsetOrderWorking
 * @returns {object} action
 */
export const unsetOrderWorking = () => ({
  type: UNSET_ORDER_WORKING
});

/**
 * @function addOrderSuccess
 * @param {object} newOrder success response
 * @returns {object} action
 */
export const addOrderSuccess = newOrder => ({
  type: ADD_ORDER_SUCCESS,
  payload: newOrder
});

/**
 * @function addOrderFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const addOrderFailure = error => ({
  type: ADD_ORDER_FAILURE,
  payload: error
});

/**
 * @function editOrderSuccess
 * @param {object} updatedOrder success response
 * @returns {object} action
 */
export const editOrderSuccess = updatedOrder => ({
  type: EDIT_ORDER_SUCCESS,
  payload: updatedOrder
});

/**
 * @function editOrderFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const editOrderFailure = error => ({
  type: EDIT_ORDER_FAILURE,
  payload: error
});

/**
 * @function cancelOrderSuccess
 * @param {object} canceledOrder success response
 * @returns {object} action
 */
export const cancelOrderSuccess = canceledOrder => ({
  type: CANCEL_ORDER_SUCCESS,
  payload: canceledOrder
});

/**
 * @function cancelOrderFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const cancelOrderFailure = error => ({
  type: CANCEL_ORDER_FAILURE,
  payload: error
});

/**
 * Fetchs Orders
 * @function fetchOrders
 * @param {string} date
 * @param {object} metadata for pagination
 * @param {func} dispatch
 * @returns {void}
 */
export const fetchOrders = (date, metadata) => async (dispatch) => {
  try {
    if (!metadata) dispatch(setFetching());

    const initialUrl = (date && !metadata) ? `/orders?date=${date}` : '/orders';

    const url = (metadata && metadata.next) ? metadata.next : initialUrl;

    const response = await instance.get(url);

    const type = metadata ? RECEIVE_MORE_ORDERS_SUCCESS : RECEIVE_ORDERS_SUCCESS;

    dispatch(fetchOrdersSuccess(type, response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchOrdersFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};

/**
 * Delivers an Order
 * @function deliverOrder
 * @param {string} orderId
 * @param {func} dispatch
 * @returns {void}
 */
export const deliverOrder = orderId => async (dispatch) => {
  try {
    dispatch(setDelivering());

    const response = await instance.post(`/orders/${orderId}/deliver`, { delivered: true });

    dispatch(deliverOrderSuccess(response.data));
    toastr.success('Order Delivered Successfully');
    dispatch(unsetDelivering());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(deliverOrderFailure(errorResponse.response));
    dispatch(unsetDelivering());
  }
};

/**
 * Adds an order
 * @function addOrder
 * @param {object} newOrder
 * @param {func} dispatch
 * @returns {void}
 */
export const addOrder = newOrder => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.post('/orders', newOrder);

    dispatch(addOrderSuccess(response.data));
    toastr.success('Order Made Successfully');
    dispatch(unsetOrderWorking());

    setTimeout(() => {
      dispatch(push(`/orders/${response.data.id}`));
    }, 500);

    reloadOrderPage(dispatch, `/orders/${response.data.id}`);
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(addOrderFailure(errorResponse.response));
    dispatch(unsetOrderWorking());
  }
};

/**
 * Edits an order
 * @function editOrder
 * @param {string} orderId
 * @param {object} updatedOrder
 * @param {func} dispatch
 * @returns {void}
 */
export const editOrder = (orderId, updatedOrder) => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.put(`/orders/${orderId}`, updatedOrder);

    dispatch(editOrderSuccess(response.data));
    toastr.success('Order Modified Successfully');
    dispatch(unsetOrderWorking());

    setTimeout(() => {
      dispatch(push(`/orders/${response.data.id}`));
    }, 500);

    reloadOrderPage(dispatch, `/orders/${response.data.id}`);
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(editOrderFailure(errorResponse.response));
    dispatch(unsetOrderWorking());
  }
};

/**
 * Cancels an order
 * @function auth
 * @param {string} orderId
 * @param {func} dispatch
 * @returns {void}
 */
export const cancelOrder = orderId => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.put(`/orders/${orderId}`, { status: 'canceled' });

    dispatch(cancelOrderSuccess(response.data));
    toastr.success('Order Canceled Successfully');
    dispatch(unsetOrderWorking());
    dispatch(push('/'));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(cancelOrderFailure(errorResponse.response));
    dispatch(unsetOrderWorking());
  }
};
