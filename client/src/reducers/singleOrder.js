import { RECEIVE_ORDER_SUCCESS, RECEIVE_ORDER_FAILURE } from '../actions/actionTypes';

const initialState = {
  item: null,
  error: null,
};

/**
 * Single Order Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action type
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ORDER_SUCCESS:
      return { ...state, item: action.payload };
    case RECEIVE_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
