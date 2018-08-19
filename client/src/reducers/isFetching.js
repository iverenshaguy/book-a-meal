import { SET_FETCHING, UNSET_FETCHING } from '../actions/actionTypes';

/**
 * Fetching Reducer
 * @param {string} state defaults to false
 * @param {string} action action object (type, payload)
 * @returns {string} new state
 */
export default (state = false, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return true;
    case UNSET_FETCHING:
      return false;
    default:
      return state;
  }
};
