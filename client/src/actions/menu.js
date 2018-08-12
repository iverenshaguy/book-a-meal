import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import instance from '../config/axios';
import errorHandler from '../utils/errorHandler';
import { setFetching, unsetFetching } from '../actions/isFetching';
import { toggleModal } from '../actions/ui';
import {
  RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE, SET_CURRENT_DAY, SET_MENU_WORKING,
  UNSET_MENU_WORKING, CLEAR_MENU_ERROR, ADD_MENU_SUCCESS, ADD_MENU_FAILURE,
  EDIT_MENU_SUCCESS, EDIT_MENU_FAILURE, RECEIVE_MORE_MENU_SUCCESS,
} from './actionTypes';

export const fetchMenuSuccess = (type, payload) => ({
  type,
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

/**
 * Fetchs Menu
 * @function fetchMenu
 * @param {string} date
 * @param {object} metadata for pagination
 * @param {func} dispatch
 * @returns {void}
 */
export const fetchMenu = (date, metadata) => async (dispatch) => {
  const menuDate = date || moment().format('YYYY-MM-DD');
  const url = (metadata && metadata.next) || `/menu?date=${menuDate}`;

  try {
    if (!metadata) dispatch(setFetching());

    const response = await instance.get(url);

    const type = metadata ? RECEIVE_MORE_MENU_SUCCESS : RECEIVE_MENU_SUCCESS;

    dispatch(fetchMenuSuccess(type, response.data));

    dispatch(unsetFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchMenuFailure(errorResponse.response));
    dispatch(unsetFetching());
  }
};

/**
 * Adds a Menu for Caterer
 * @function addMenu
 * @param {object} menu
 * @param {func} dispatch
 * @returns {void}
 */
export const addMenu = menu => async (dispatch) => {
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

/**
 * Edits a Menu
 * @function editMenu
 * @param {string} id
 * @param {object} menu
 * @param {func} dispatch
 * @returns {void}
 */
export const editMenu = (id, menu) => async (dispatch) => {
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
