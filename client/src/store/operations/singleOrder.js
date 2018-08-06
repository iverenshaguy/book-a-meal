import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import { fetchOrderSuccess, fetchOrderFailure } from '../actions/singleOrder';

const fetchOrder = id => async (dispatch) => {
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


export default {
  fetchOrder,
  fetchOrderSuccess,
  fetchOrderFailure,
};
