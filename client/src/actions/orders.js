import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import instance from '../config/axios';
import errorHandler from '../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import reloadOrderPage from '../utils/reloadOrderPage';
import {
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, SET_DELIVERING, UNSET_DELIVERING,
  ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE, SET_ORDER_WORKING, UNSET_ORDER_WORKING,
  EDIT_ORDER_SUCCESS, EDIT_ORDER_FAILURE, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  RECEIVE_ORDERS_FAILURE, RECEIVE_ORDERS_SUCCESS, RECEIVE_MORE_ORDERS_SUCCESS
} from './actionTypes';

/**
 * @function fetchOrdersSuccess
 * @param {string} type actionType
 * @param {object} payload success response
 * @returns {object} action
 */
export const fetchOrdersSuccess = (type, payload) => ({
  type,
  payload
});

/**
 * @function fetchOrdersFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const fetchOrdersFailure = payload => ({
  type: RECEIVE_ORDERS_FAILURE,
  payload
});

/**
 * @function deliverOrderSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const deliverOrderSuccess = payload => ({
  type: DELIVER_ORDER_SUCCESS,
  payload
});

/**
 * @function deliverOrderFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const deliverOrderFailure = payload => ({
  type: DELIVER_ORDER_FAILURE,
  payload
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
 * @param {object} payload success response
 * @returns {object} action
 */
export const addOrderSuccess = payload => ({
  type: ADD_ORDER_SUCCESS,
  payload
});

/**
 * @function addOrderFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const addOrderFailure = payload => ({
  type: ADD_ORDER_FAILURE,
  payload
});

/**
 * @function editOrderSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const editOrderSuccess = payload => ({
  type: EDIT_ORDER_SUCCESS,
  payload
});

/**
 * @function editOrderFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const editOrderFailure = payload => ({
  type: EDIT_ORDER_FAILURE,
  payload
});

/**
 * @function cancelOrderSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const cancelOrderSuccess = payload => ({
  type: CANCEL_ORDER_SUCCESS,
  payload
});

/**
 * @function cancelOrderFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const cancelOrderFailure = payload => ({
  type: CANCEL_ORDER_FAILURE,
  payload
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
 * @param {string} id
 * @param {func} dispatch
 * @returns {void}
 */
export const deliverOrder = id => async (dispatch) => {
  try {
    dispatch(setDelivering());

    const response = await instance.post(`/orders/${id}/deliver`, { delivered: true });

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
 * @param {object} order
 * @param {func} dispatch
 * @returns {void}
 */
export const addOrder = order => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.post('/orders', order);

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
 * @param {string} id
 * @param {object} order
 * @param {func} dispatch
 * @returns {void}
 */
export const editOrder = (id, order) => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.put(`/orders/${id}`, order);

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
 * @param {string} id
 * @param {func} dispatch
 * @returns {void}
 */
export const cancelOrder = id => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.put(`/orders/${id}`, { status: 'canceled' });

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
