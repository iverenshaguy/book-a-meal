import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import {
  setMenuWorking, unsetMenuWorking, fetchMenuSuccess, fetchMenuFailure,
  setCurrentDay, addMenuSuccess, addMenuFailure, clearMenuError,
  editMenuSuccess, editMenuFailure,
} from '../actions/menu';
import { toggleModal } from '../actions/ui';

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

const addMenu = menu => async (dispatch) => {
  try {
    dispatch(setMenuWorking());

    const response = await instance.post('/menu', menu);

    dispatch(addMenuSuccess(response.data));
    dispatch(unsetMenuWorking());
    dispatch(toggleModal());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(addMenuFailure(errorResponse.response));
    dispatch(unsetMenuWorking());
  }
};

const editMenu = (id, menu) => async (dispatch) => {
  try {
    dispatch(setMenuWorking());

    const response = await instance.put(`/menu/${id}`, menu);

    dispatch(editMenuSuccess(response.data));
    dispatch(unsetMenuWorking());
    dispatch(toggleModal());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(editMenuFailure(errorResponse.response));
    dispatch(unsetMenuWorking());
  }
};

export default {
  addMenu,
  editMenu,
  fetchMenu,
  setCurrentDay,
  clearMenuError,
  addMenuSuccess,
  addMenuFailure,
  editMenuSuccess,
  editMenuFailure,
  setMenuWorking,
  unsetMenuWorking,
  fetchMenuSuccess,
  fetchMenuFailure,
};
