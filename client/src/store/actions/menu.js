import {
  RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE, SET_CURRENT_DAY, SET_MENU_WORKING,
  UNSET_MENU_WORKING, CLEAR_MENU_ERROR, ADD_MENU_SUCCESS, ADD_MENU_FAILURE,
  EDIT_MENU_SUCCESS, EDIT_MENU_FAILURE
} from '../types';

export const fetchMenuSuccess = payload => ({
  type: RECEIVE_MENU_SUCCESS,
  payload
});

export const setMenuWorking = () => ({
  type: SET_MENU_WORKING
});

export const unsetMenuWorking = () => ({
  type: UNSET_MENU_WORKING
});

export const clearMenuError = () => ({
  type: CLEAR_MENU_ERROR
});

export const fetchMenuFailure = payload => ({
  type: RECEIVE_MENU_FAILURE,
  payload
});

export const setCurrentDay = payload => ({
  type: SET_CURRENT_DAY,
  payload
});

export const addMenuSuccess = payload => ({
  type: ADD_MENU_SUCCESS,
  payload
});

export const addMenuFailure = payload => ({
  type: ADD_MENU_FAILURE,
  payload
});

export const editMenuSuccess = payload => ({
  type: EDIT_MENU_SUCCESS,
  payload
});

export const editMenuFailure = payload => ({
  type: EDIT_MENU_FAILURE,
  payload
});
