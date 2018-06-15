import moment from 'moment';
import { RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE, SET_CURRENT_DAY } from '../types';

const initialValues = {
  meals: [],
  error: null,
  working: false,
  currentDay: moment().format('YYYY-MM-DD'),
};

export default (state = initialValues, action) => {
  switch (action.type) {
    case RECEIVE_MENU_SUCCESS:
      return { ...state, meals: action.payload.meals };
    case RECEIVE_MENU_FAILURE:
      return { ...state, error: action.payload };
    case SET_CURRENT_DAY:
      return { ...state, currentDay: action.payload };
    default:
      return state;
  }
};
