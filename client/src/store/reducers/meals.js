import {
  RECEIVE_MEALS_SUCCESS, RECEIVE_MEALS_FAILURE, ADD_MEAL_SUCCESS,
  ADD_MEAL_FAILURE, SET_MEAL_WORKING, UNSET_MEAL_WORKING, CLEAR_MEAL_ERROR,
  EDIT_MEAL_SUCCESS, EDIT_MEAL_FAILURE,
} from '../types';

const initialValues = {
  items: [],
  working: false,
  error: null
};

export default (state = initialValues, action) => {
  const index = action.payload && state.items.findIndex(meal => meal.id === action.payload.id);

  switch (action.type) {
    case SET_MEAL_WORKING:
      return { ...state, working: true };
    case UNSET_MEAL_WORKING:
      return { ...state, working: false };
    case CLEAR_MEAL_ERROR:
      return { ...state, error: null };
    case ADD_MEAL_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };
    case EDIT_MEAL_SUCCESS:
      return {
        ...state,
        items: [
          ...state.items.slice(0, index),
          {
            ...state.items[index],
            ...action.payload
          },
          ...state.items.slice(index + 1)
        ],
      };
    case RECEIVE_MEALS_SUCCESS:
      return { ...state, items: action.payload };
    case ADD_MEAL_FAILURE:
    case EDIT_MEAL_FAILURE:
    case RECEIVE_MEALS_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
