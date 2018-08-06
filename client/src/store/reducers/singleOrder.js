import { RECEIVE_ORDER_SUCCESS, RECEIVE_ORDER_FAILURE } from '../types';

const initialValues = {
  item: null,
  error: null,
};

export default (state = initialValues, action) => {
  switch (action.type) {
    case RECEIVE_ORDER_SUCCESS:
      return { ...state, item: action.payload };
    case RECEIVE_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
