import { push } from 'react-router-redux';
import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import {
  fetchOrdersSuccess, fetchOrdersFailure, deliverOrderSuccess, deliverOrderFailure,
  setDelivering, unsetDelivering, addOrderSuccess, addOrderFailure, setOrderWorking,
  unsetOrderWorking, editOrderSuccess, editOrderFailure, cancelOrderSuccess, cancelOrderFailure,
} from '../actions/orders';
import { toggleModal } from '../actions/ui';
import reloadOrderPage from '../../utils/reloadOrderPage';

const fetchOrders = date => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = date ? await instance.get(`/orders?date=${date}`) : await instance.get('/orders');

    dispatch(fetchOrdersSuccess(response.data));
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
    dispatch(unsetOrderWorking());
    dispatch(toggleModal('orderSuccessMsg'));

    setTimeout(() => {
      dispatch(toggleModal());
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
    dispatch(unsetOrderWorking());
    dispatch(toggleModal('orderSuccessMsg'));

    setTimeout(() => {
      dispatch(toggleModal());
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
    dispatch(unsetOrderWorking());
    dispatch(push('/'));
    dispatch(toggleModal('orderCanceledMsg'));

    setTimeout(() => {
      dispatch(toggleModal());
    }, 500);
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
