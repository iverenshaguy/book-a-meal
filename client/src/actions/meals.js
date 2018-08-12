import { toastr } from 'react-redux-toastr';
import instance from '../config/axios';
import errorHandler from '../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import { toggleModal } from '../actions/ui';
import {
  RECEIVE_MEALS_SUCCESS, RECEIVE_MEALS_FAILURE, SET_MEAL_WORKING,
  UNSET_MEAL_WORKING, CLEAR_MEAL_ERROR, ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE,
  EDIT_MEAL_SUCCESS, EDIT_MEAL_FAILURE, DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE,
  RECEIVE_MORE_MEALS_SUCCESS
} from './actionTypes';

export const fetchMealsSuccess = (type, payload) => ({
  type,
  payload
});

export const fetchMealsFailure = payload => ({
  type: RECEIVE_MEALS_FAILURE,
  payload
});

export const setMealWorking = () => ({
  type: SET_MEAL_WORKING
});

export const unsetMealWorking = () => ({
  type: UNSET_MEAL_WORKING
});

export const addMealSuccess = payload => ({
  type: ADD_MEAL_SUCCESS,
  payload
});

export const addMealFailure = payload => ({
  type: ADD_MEAL_FAILURE,
  payload
});

export const editMealSuccess = payload => ({
  type: EDIT_MEAL_SUCCESS,
  payload
});

export const editMealFailure = payload => ({
  type: EDIT_MEAL_FAILURE,
  payload
});

export const deleteMealSuccess = payload => ({
  type: DELETE_MEAL_SUCCESS,
  payload
});

export const deleteMealFailure = payload => ({
  type: DELETE_MEAL_FAILURE,
  payload
});

export const clearMealError = () => ({
  type: CLEAR_MEAL_ERROR
});

/**
 * Fetchs Meals for Caterer
 * @function fetchMeals
 * @param {object} metadata
 * @param {func} dispatch
 * @returns {void}
 */
export const fetchMeals = metadata => async (dispatch) => {
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

/**
 * Adds a Meal for Caterer
 * @function addMeal
 * @param {object} meal
 * @param {func} dispatch
 * @returns {void}
 */
export const addMeal = meal => async (dispatch) => {
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

/**
 * Edits a Meal
 * @function editMeal
 * @param {string} id
 * @param {object} updatedMeal
 * @param {func} dispatch
 * @returns {void}
 */
export const editMeal = (id, updatedMeal) => async (dispatch) => {
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

/**
 * Deletes a Meal
 * @function deleteMeal
 * @param {id} id
 * @param {func} dispatch
 * @returns {void}
 */
export const deleteMeal = id => async (dispatch) => {
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
