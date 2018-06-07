import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import { fetchOrdersSuccess, fetchOrdersFailure, deliverOrderSuccess, deliverOrderFailure, setDelivering, unsetDelivering } from '../actions/orders';
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

export default {
  fetchOrders,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  deliverOrder,
  setDelivering,
  unsetDelivering,
  deliverOrderSuccess,
  deliverOrderFailure,
};
