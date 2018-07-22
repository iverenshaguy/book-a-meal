import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import {
  setMenuWorking, unsetMenuWorking, fetchMenuSuccess, fetchMenuFailure,
  setCurrentDay, addMenuSuccess, addMenuFailure, clearMenuError,
  editMenuSuccess, editMenuFailure,
} from '../actions/menu';
import { toggleModal } from '../actions/ui';
import { flattenMealsIntoSingleArray } from '../selectors/menu';

const fetchMenu = date => async (dispatch) => {
  try {
    dispatch(setFetching());

    const menuDate = date || moment().format('YYYY-MM-DD');

    const response = await instance.get(`/menu?date=${menuDate}`);

    if (response.data.menu) {
      dispatch(fetchMenuSuccess(flattenMealsIntoSingleArray(response.data.menu)));
    } else {
      dispatch(fetchMenuSuccess(response.data));
    }

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
    toastr.success('Menu Set Successfully');
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
    toastr.success('Menu Set Successfully');
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
