import {
  RECEIVE_MEALS_SUCCESS, RECEIVE_MEALS_FAILURE, SET_MEAL_WORKING,
  UNSET_MEAL_WORKING, CLEAR_MEAL_ERROR, ADD_MEAL_SUCCESS, ADD_MEAL_FAILURE,
  EDIT_MEAL_SUCCESS, EDIT_MEAL_FAILURE, DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE
} from '../types';

export const fetchMealsSuccess = payload => ({
  type: RECEIVE_MEALS_SUCCESS,
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
