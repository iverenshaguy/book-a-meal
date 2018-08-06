import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import {
  fetchOrdersSuccess, fetchOrdersFailure, deliverOrderSuccess, deliverOrderFailure,
  setDelivering, unsetDelivering, addOrderSuccess, addOrderFailure, setOrderWorking,
  unsetOrderWorking, editOrderSuccess, editOrderFailure, cancelOrderSuccess, cancelOrderFailure,
} from '../actions/orders';
import reloadOrderPage from '../../utils/reloadOrderPage';
import { RECEIVE_ORDERS_SUCCESS, RECEIVE_MORE_ORDERS_SUCCESS } from '../types';

const fetchOrders = (date, metadata) => async (dispatch) => {
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

const deliverOrder = id => async (dispatch) => {
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

const addOrder = order => async (dispatch) => {
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

const editOrder = (orderId, order) => async (dispatch) => {
  try {
    dispatch(setOrderWorking());

    const response = await instance.put(`/orders/${orderId}`, order);

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

const cancelOrder = id => async (dispatch) => {
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

export default {
  addOrder,
  editOrder,
  cancelOrder,
  fetchOrders,
  deliverOrder,
  setDelivering,
  unsetDelivering,
  addOrderSuccess,
  addOrderFailure,
  editOrderSuccess,
  editOrderFailure,
  cancelOrderSuccess,
  cancelOrderFailure,
  setOrderWorking,
  unsetOrderWorking,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  deliverOrderSuccess,
  deliverOrderFailure,
};
