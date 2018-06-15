import { RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE, SET_CURRENT_DAY } from '../types';

export const fetchMenuSuccess = payload => ({
  type: RECEIVE_MENU_SUCCESS,
  payload
});

export const fetchMenuFailure = payload => ({
  type: RECEIVE_MENU_FAILURE,
  payload
});

export const setCurrentDay = payload => ({
  type: SET_CURRENT_DAY,
  payload
});
