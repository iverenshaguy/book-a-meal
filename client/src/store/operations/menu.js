import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import { fetchMenuSuccess, fetchMenuFailure } from '../actions/menu';

const fetchMenu = date => async (dispatch) => {
  try {
    dispatch(setFetching());

    const response = await instance.get(`/menu?date=${date}`);

    dispatch(fetchMenuSuccess(response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchMenuFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};

export default {
  fetchMenu,
  fetchMenuSuccess,
  fetchMenuFailure,
};
