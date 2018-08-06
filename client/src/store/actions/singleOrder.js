import { RECEIVE_ORDER_SUCCESS, RECEIVE_ORDER_FAILURE } from '../types';

export const fetchOrderSuccess = payload => ({
  type: RECEIVE_ORDER_SUCCESS,
  payload
});

export const fetchOrderFailure = payload => ({
  type: RECEIVE_ORDER_FAILURE,
  payload
});
