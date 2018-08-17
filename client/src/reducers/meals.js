import {
  RECEIVE_MEALS_SUCCESS, RECEIVE_MEALS_FAILURE, ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE, SET_MEAL_WORKING, UNSET_MEAL_WORKING, CLEAR_MEAL_ERROR,
  EDIT_MEAL_SUCCESS, EDIT_MEAL_FAILURE, DELETE_MEAL_SUCCESS, DELETE_MEAL_FAILURE,
  RECEIVE_MORE_MEALS_SUCCESS
} from '../actions/actionTypes';
import getUpdatedItems from '../helpers/getUpdatedItems';

const initialState = {
  items: [],
  metadata: {},
  working: false,
  error: null
};

/**
 * Meals Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action type
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEAL_WORKING:
      return { ...state, working: true };
    case UNSET_MEAL_WORKING:
      return { ...state, working: false };
    case CLEAR_MEAL_ERROR:
      return { ...state, error: null };
    case ADD_MEAL_SUCCESS:
      return { ...state, items: [action.payload, ...state.items] };
    case EDIT_MEAL_SUCCESS:
      return {
        ...state,
        items: getUpdatedItems(state.items, action.payload),
      };
    case DELETE_MEAL_SUCCESS:
      return {
        ...state,
        items: state.items.filter(meal => meal.id !== action.payload),
      };
    case RECEIVE_MEALS_SUCCESS:
      return {
        ...state,
        items: action.payload.meals,
        metadata: action.payload.metadata
      };
    case RECEIVE_MORE_MEALS_SUCCESS:
      return {
        ...state,
        items: [...state.items, ...action.payload.meals],
        metadata: action.payload.metadata
      };
    case ADD_MEAL_FAILURE:
    case EDIT_MEAL_FAILURE:
    case DELETE_MEAL_FAILURE:
    case RECEIVE_MEALS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
