import { RECEIVE_MENU_SUCCESS, RECEIVE_MENU_FAILURE } from '../types';

const initialValues = {
  meals: [],
  working: false,
  error: null
};

export default (state = initialValues, action) => {
  switch (action.type) {
    case RECEIVE_MENU_SUCCESS:
      return { ...state, meals: action.payload.meals };
    case RECEIVE_MENU_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
