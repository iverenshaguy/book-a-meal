import instance from '../config/axios';
import errorHandler from '../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import { RECEIVE_ORDER_SUCCESS, RECEIVE_ORDER_FAILURE } from './actionTypes';

/**
 * @function fetchOrderSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const fetchOrderSuccess = payload => ({
  type: RECEIVE_ORDER_SUCCESS,
  payload
});

/**
 * @function fetchOrderSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const fetchOrderFailure = payload => ({
  type: RECEIVE_ORDER_FAILURE,
  payload
});

/**
 * Fetchs an Order
 * @function auth
 * @param {string} id
 * @param {func} dispatch
 * @returns {void}
 */
export const fetchOrder = id => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/orders/${id}`);

    dispatch(fetchOrderSuccess(response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchOrderFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};
