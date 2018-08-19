import instance from '../config/axios';
import errorHandler from '../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import { RECEIVE_ORDER_SUCCESS, RECEIVE_ORDER_FAILURE } from './actionTypes';

/**
 * @function fetchOrderSuccess
 * @param {object} orderObj success response
 * @returns {object} action
 */
export const fetchOrderSuccess = orderObj => ({
  type: RECEIVE_ORDER_SUCCESS,
  payload: orderObj
});

/**
 * @function fetchOrderSuccess
 * @param {object} error success response
 * @returns {object} action
 */
export const fetchOrderFailure = error => ({
  type: RECEIVE_ORDER_FAILURE,
  payload: error
});

/**
 * Fetchs an Order
 * @function fetchOrder
 * @param {string} orderId
 * @param {func} dispatch
 * @returns {void}
 */
export const fetchOrder = orderId => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/orders/${orderId}`);

    dispatch(fetchOrderSuccess(response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchOrderFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};
