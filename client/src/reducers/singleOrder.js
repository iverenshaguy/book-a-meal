import { RECEIVE_ORDER_SUCCESS, RECEIVE_ORDER_FAILURE, DELIVER_ORDER_SUCCESS } from '../constants/actionTypes';

const initialState = {
  item: null,
  error: null,
};

/**
 * Single Order Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action object (type, payload)
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ORDER_SUCCESS:
    case DELIVER_ORDER_SUCCESS:
      return { ...state, item: action.payload };
    case RECEIVE_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
