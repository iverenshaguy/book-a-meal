import moment from 'moment';
import {
  RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE, SET_CURRENT_DAY, ADD_MENU_SUCCESS,
  ADD_MENU_FAILURE, SET_MENU_WORKING, UNSET_MENU_WORKING, CLEAR_MENU_ERROR,
  EDIT_MENU_SUCCESS, EDIT_MENU_FAILURE, RECEIVE_MORE_MENU_SUCCESS,
  SET_MENU_FETCHING, UNSET_MENU_FETCHING
} from '../constants/actionTypes';

const initialState = {
  id: null,
  meals: [],
  error: null,
  working: false,
  isFetching: false,
  currentDay: moment().format('YYYY-MM-DD'),
  metadata: {}
};

/**
 * Menu Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action object (type, payload)
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_WORKING:
      return { ...state, working: true };
    case UNSET_MENU_WORKING:
      return { ...state, working: false };
    case SET_MENU_FETCHING:
      return { ...state, isFetching: true };
    case UNSET_MENU_FETCHING:
      return { ...state, isFetching: false };
    case CLEAR_MENU_ERROR:
      return { ...state, error: null };
    case ADD_MENU_SUCCESS:
    case EDIT_MENU_SUCCESS:
      return {
        ...state,
        id: action.payload.id,
        currentDay: action.payload.date,
        meals: action.payload.meals,
        metadata: {
          ...state.metadata,
          next: undefined
        }
      };
    case RECEIVE_MENU_SUCCESS:
      return {
        ...state,
        id: action.payload.menu.id,
        currentDay: action.payload.menu.date,
        meals: action.payload.menu.meals,
        metadata: action.payload.metadata
      };
    case RECEIVE_MORE_MENU_SUCCESS:
      return {
        ...state,
        meals: [...state.meals, ...action.payload.menu.meals],
        metadata: action.payload.metadata
      };
    case ADD_MENU_FAILURE:
    case EDIT_MENU_FAILURE:
    case RECEIVE_MENU_FAILURE:
      return { ...state, error: action.payload };
    case SET_CURRENT_DAY:
      return { ...state, currentDay: action.payload };
    default:
      return state;
  }
};
