import {
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, SET_DELIVERING, UNSET_DELIVERING,
  ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE, SET_ORDER_WORKING, UNSET_ORDER_WORKING,
  EDIT_ORDER_SUCCESS, EDIT_ORDER_FAILURE, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  RECEIVE_ORDERS_SUCCESS, RECEIVE_ORDERS_FAILURE
} from '../types';

export const fetchOrdersSuccess = (type, payload) => ({
  type: RECEIVE_ORDERS_SUCCESS,
  payload
});

export const fetchOrdersFailure = (type, payload) => ({
  type: RECEIVE_ORDERS_FAILURE,
  payload
});

export const deliverOrderSuccess = payload => ({
  type: DELIVER_ORDER_SUCCESS,
  payload
});

export const deliverOrderFailure = payload => ({
  type: DELIVER_ORDER_FAILURE,
  payload
});

export const setDelivering = () => ({
  type: SET_DELIVERING
});

export const unsetDelivering = () => ({
  type: UNSET_DELIVERING
});

export const setOrderWorking = () => ({
  type: SET_ORDER_WORKING
});

export const unsetOrderWorking = () => ({
  type: UNSET_ORDER_WORKING
});

export const addOrderSuccess = payload => ({
  type: ADD_ORDER_SUCCESS,
  payload
});

export const addOrderFailure = payload => ({
  type: ADD_ORDER_FAILURE,
  payload
});

export const editOrderSuccess = payload => ({
  type: EDIT_ORDER_SUCCESS,
  payload
});

export const editOrderFailure = payload => ({
  type: EDIT_ORDER_FAILURE,
  payload
});

export const cancelOrderSuccess = payload => ({
  type: CANCEL_ORDER_SUCCESS,
  payload
});

export const cancelOrderFailure = payload => ({
  type: CANCEL_ORDER_FAILURE,
  payload
});
