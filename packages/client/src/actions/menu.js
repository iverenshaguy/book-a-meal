import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import instance from '../config/axios';
import errorHandler from '../helpers/errorHandler';
import { toggleModal } from './ui';
import {
  RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE, SET_CURRENT_DAY, SET_MENU_WORKING,
  UNSET_MENU_WORKING, CLEAR_MENU_ERROR, ADD_MENU_SUCCESS, ADD_MENU_FAILURE,
  EDIT_MENU_SUCCESS, EDIT_MENU_FAILURE, RECEIVE_MORE_MENU_SUCCESS,
  SET_MENU_FETCHING, UNSET_MENU_FETCHING
} from '../constants/actionTypes';

/**
 * @function setMenuWorking
 * @returns {object} action
 */
export const setMenuWorking = () => ({
  type: SET_MENU_WORKING
});

/**
 * @function unsetMenuWorking
 * @returns {object} action
 */
export const unsetMenuWorking = () => ({
  type: UNSET_MENU_WORKING
});

/**
 * @function setMenuWorking
 * @returns {object} action
 */
export const setMenuFetching = () => ({
  type: SET_MENU_FETCHING
});

/**
 * @function unsetMenuWorking
 * @returns {object} action
 */
export const unsetMenuFetching = () => ({
  type: UNSET_MENU_FETCHING
});

/**
 * @function clearMenuError
 * @returns {object} action
 */
export const clearMenuError = () => ({
  type: CLEAR_MENU_ERROR
});


/**
 * @function fetchMenuSuccess
 * @param {string} type actionType
 * @param {object} menuObj (menu, metadata)
 * @returns {object} action
 */
export const fetchMenuSuccess = (type, menuObj) => ({
  type,
  payload: menuObj
});

/**
 * @function fetchMenuFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const fetchMenuFailure = error => ({
  type: RECEIVE_MENU_FAILURE,
  payload: error
});

/**
 * @function setCurrentDay
 * @param {object} date success response
 * @returns {object} action
 */
export const setCurrentDay = date => ({
  type: SET_CURRENT_DAY,
  payload: date
});

/**
 * @function addMenuSuccess
 * @param {object} newMenu success response
 * @returns {object} action
 */
export const addMenuSuccess = newMenu => ({
  type: ADD_MENU_SUCCESS,
  payload: newMenu
});

/**
 * @function addMenuFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const addMenuFailure = error => ({
  type: ADD_MENU_FAILURE,
  payload: error
});

/**
 * @function editMenuSuccess
 * @param {object} updatedMenu success response
 * @returns {object} action
 */
export const editMenuSuccess = updatedMenu => ({
  type: EDIT_MENU_SUCCESS,
  payload: updatedMenu
});

/**
 * @function editMenuFailure
 * @param {object} error error response
 * @returns {object} action
 */
export const editMenuFailure = error => ({
  type: EDIT_MENU_FAILURE,
  payload: error
});

/**
 * Fetchs Menu
 * @function fetchMenu
 * @param {string} date
 * @param {object} metadata for pagination
 * @param {string} searchTerm
 * @param {func} dispatch
 * @returns {void}
 */
export const fetchMenu = (date, metadata, searchTerm) => async (dispatch) => {
  const menuDate = date || moment().format('YYYY-MM-DD');
  const searchUrl = searchTerm ? `/menu?date=${menuDate}&search=${searchTerm}` : `/menu?date=${menuDate}`;
  const url = (metadata && metadata.next) || searchUrl;

  try {
    if (!metadata) dispatch(setMenuFetching());

    const response = await instance.get(url);

    const actionType = metadata ? RECEIVE_MORE_MENU_SUCCESS : RECEIVE_MENU_SUCCESS;

    dispatch(fetchMenuSuccess(actionType, response.data));

    dispatch(unsetMenuFetching());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(fetchMenuFailure(errorResponse.response));
    dispatch(unsetMenuFetching());
  }
};

/**
 * Adds a Menu for Caterer
 * @function addMenu
 * @param {object} newMenu
 * @param {func} dispatch
 * @returns {void}
 */
export const addMenu = newMenu => async (dispatch) => {
  try {
    dispatch(setMenuWorking());

    const response = await instance.post('/menu', newMenu);

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
 * @param {object} updatedMenu
 * @param {func} dispatch
 * @returns {void}
 */
export const editMenu = (id, updatedMenu) => async (dispatch) => {
  try {
    dispatch(setMenuWorking());

    const response = await instance.put(`/menu/${id}`, updatedMenu);

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
