import moment from 'moment';
import {
  RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE, SET_CURRENT_DAY, ADD_MENU_SUCCESS,
  ADD_MENU_FAILURE, SET_MENU_WORKING, UNSET_MENU_WORKING, CLEAR_MENU_ERROR,
} from '../types';

const initialValues = {
  meals: [],
  error: null,
  working: false,
  currentDay: moment().format('YYYY-MM-DD'),
};

export default (state = initialValues, action) => {
  switch (action.type) {
    case SET_MENU_WORKING:
      return { ...state, working: true };
    case UNSET_MENU_WORKING:
      return { ...state, working: false };
    case CLEAR_MENU_ERROR:
      return { ...state, error: null };
    case ADD_MENU_SUCCESS:
    case RECEIVE_MENU_SUCCESS:
      return { ...state, currentDay: action.payload.date, meals: action.payload.meals };
    case ADD_MENU_FAILURE:
    case RECEIVE_MENU_FAILURE:
      return { ...state, error: action.payload };
    case SET_CURRENT_DAY:
      return { ...state, currentDay: action.payload };
    default:
      return state;
  }
};
