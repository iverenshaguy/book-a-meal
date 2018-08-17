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

/**
 * @function fetchMealsSuccess
 * @param {string} type actionType
 * @param {object} payload success response
 * @returns {object} action
 */
export const fetchMealsSuccess = (type, payload) => ({
  type,
  payload
});

/**
 * @function fetchMealsFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const fetchMealsFailure = payload => ({
  type: RECEIVE_MEALS_FAILURE,
  payload
});

/**
 * @function setMealWorking
 * @returns {object} action
 */
export const setMealWorking = () => ({
  type: SET_MEAL_WORKING
});

/**
 * @function unsetMealWorking
 * @returns {object} action
 */
export const unsetMealWorking = () => ({
  type: UNSET_MEAL_WORKING
});

/**
 * @function addMealSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const addMealSuccess = payload => ({
  type: ADD_MEAL_SUCCESS,
  payload
});

/**
 * @function addMealFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const addMealFailure = payload => ({
  type: ADD_MEAL_FAILURE,
  payload
});

/**
 * @function editMealSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const editMealSuccess = payload => ({
  type: EDIT_MEAL_SUCCESS,
  payload
});

/**
 * @function editMealFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const editMealFailure = payload => ({
  type: EDIT_MEAL_FAILURE,
  payload
});

/**
 * @function deleteMealSuccess
 * @param {object} payload success response
 * @returns {object} action
 */
export const deleteMealSuccess = payload => ({
  type: DELETE_MEAL_SUCCESS,
  payload
});

/**
 * @function deleteMealFailure
 * @param {object} payload error response
 * @returns {object} action
 */
export const deleteMealFailure = payload => ({
  type: DELETE_MEAL_FAILURE,
  payload
});

/**
 * @function clearMealError
 * @returns {object} action
 */
export const clearMealError = () => ({
  type: CLEAR_MEAL_ERROR
});

/**
 * Fetchs Meals for Caterer
 * @function fetchMeals
 * @param {object} metadata
 * @param {string} searchTerm
 * @param {func} dispatch
 * @returns {void}
 */
export const fetchMeals = (metadata, searchTerm) => async (dispatch) => {
  const searchUrl = searchTerm ? `/meals?search=${searchTerm}` : '/meals';
  const url = (metadata && metadata.next) || searchUrl;

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
