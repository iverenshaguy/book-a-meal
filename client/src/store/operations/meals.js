import { toastr } from 'react-redux-toastr';
import instance from '../../config/axios';
import errorHandler from '../../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import {
  setMealWorking, unsetMealWorking, fetchMealsSuccess, fetchMealsFailure,
  clearMealError, addMealSuccess, addMealFailure, editMealSuccess, editMealFailure,
  deleteMealSuccess, deleteMealFailure
} from '../actions/meals';
import { toggleModal } from '../actions/ui';
import { RECEIVE_MEALS_SUCCESS, RECEIVE_MORE_MEALS_SUCCESS } from '../types';

const fetchMeals = metadata => async (dispatch) => {
  const url = (metadata && metadata.next) || '/meals';

  try {
    if (!metadata) dispatch(setFetching());

    const response = await instance.get(url);

    const type = metadata ? RECEIVE_MORE_MEALS_SUCCESS : RECEIVE_MEALS_SUCCESS;

    dispatch(fetchMealsSuccess(type, response.data));
    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchMealsFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};
const addMeal = meal => async (dispatch) => {
  try {
    dispatch(setMealWorking());

    const response = await instance.post('/meals', meal);

    dispatch(addMealSuccess(response.data));
    toastr.success('Meal Added Successfully');
    dispatch(unsetMealWorking());
    dispatch(toggleModal());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(addMealFailure(errorResponse.response));
    dispatch(unsetMealWorking());
  }
};

const editMeal = (id, updatedMeal) => async (dispatch) => {
  try {
    dispatch(setMealWorking());

    const response = await instance.put(`/meals/${id}`, updatedMeal);

    dispatch(editMealSuccess(response.data));
    toastr.success('Meal Modified Successfully');
    dispatch(unsetMealWorking());
    dispatch(toggleModal());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(editMealFailure(errorResponse.response));
    dispatch(unsetMealWorking());
  }
};

const deleteMeal = id => async (dispatch) => {
  try {
    dispatch(setMealWorking());

    await instance.delete(`/meals/${id}`);

    dispatch(deleteMealSuccess(id));
    toastr.success('Meal Deleted Successfully');
    dispatch(unsetMealWorking());
    dispatch(toggleModal());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(deleteMealFailure(errorResponse.response));
    dispatch(unsetMealWorking());
  }
};

export default {
  addMeal,
  editMeal,
  fetchMeals,
  deleteMeal,
  clearMealError,
  addMealSuccess,
  addMealFailure,
  editMealSuccess,
  editMealFailure,
  deleteMealSuccess,
  deleteMealFailure,
  setMealWorking,
  unsetMealWorking,
  fetchMealsSuccess,
  fetchMealsFailure,
};
