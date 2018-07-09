import { push } from 'react-router-redux';
import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import {
  fetchOrdersSuccess, fetchOrdersFailure, deliverOrderSuccess, deliverOrderFailure,
  setDelivering, unsetDelivering, addOrderSuccess, addOrderFailure, setOrderWorking,
  unsetOrderWorking, editOrderSuccess, editOrderFailure,
} from '../actions/orders';
import { toggleModal } from '../actions/ui';
import { RECEIVE_CATERERS_ORDERS_SUCCESS, RECEIVE_CATERERS_ORDERS_FAILURE } from '../types';

const fetchOrders = (type, date) => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = date ? await instance.get(`/orders?date=${date}`) : await instance.get('/orders');

    dispatch(fetchOrdersSuccess(RECEIVE_CATERERS_ORDERS_SUCCESS, response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchOrdersFailure(RECEIVE_CATERERS_ORDERS_FAILURE, errorResponse.response));
    dispatch(unsetFetching());
  }
};

const deliverOrder = id => async (dispatch) => {
  try {
    dispatch(setDelivering());

    const response = await instance.post(`/orders/${id}/deliver`, { delivered: true });

    dispatch(deliverOrderSuccess(response.data));
    dispatch(unsetDelivering());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(deliverOrderFailure(errorResponse.response));
    dispatch(unsetDelivering());
  }
};

const addOrder = order => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.post('/orders', order);

    dispatch(addOrderSuccess([response.data]));
    dispatch(unsetOrderWorking());
    dispatch(toggleModal('orderSuccessMsg'));
    setTimeout(() => {
      dispatch(toggleModal());
      dispatch(push(`/orders/${response.data.id}`));
    }, 500);
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(addOrderFailure(errorResponse.response));
    dispatch(unsetOrderWorking());
  }
};

const editOrder = (orderId, order) => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.put(`/orders/${orderId}`, order);

    dispatch(editOrderSuccess([response.data]));
    dispatch(unsetOrderWorking());
    dispatch(toggleModal('orderSuccessMsg'));
    setTimeout(() => {
      dispatch(toggleModal());
      dispatch(push(`/orders/${response.data.id}`));
    }, 500);
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(editOrderFailure(errorResponse.response));
    dispatch(unsetOrderWorking());
  }
};

export default {
  addOrder,
  editOrder,
  fetchOrders,
  deliverOrder,
  setDelivering,
  unsetDelivering,
  addOrderSuccess,
  addOrderFailure,
  editOrderSuccess,
  editOrderFailure,
  setOrderWorking,
  unsetOrderWorking,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  deliverOrderSuccess,
  deliverOrderFailure,
};
