import { RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE } from '../types';

export const fetchMenuSuccess = payload => ({
  type: RECEIVE_MENU_SUCCESS,
  payload
});

export const fetchMenuFailure = payload => ({
  type: RECEIVE_MENU_FAILURE,
  payload
});
