import { DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, SET_DELIVERING, UNSET_DELIVERING } from '../types';

export const fetchOrdersSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchOrdersFailure = (type, payload) => ({
  type,
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

