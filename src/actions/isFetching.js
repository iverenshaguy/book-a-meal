import { SET_FETCHING, UNSET_FETCHING } from '../constants/actionTypes';

/**
 * @function setFetching
 * @returns {object} action
 */
export const setFetching = () => ({
  type: SET_FETCHING
});

/**
 * @function unsetFetching
 * @returns {object} action
 */
export const unsetFetching = () => ({
  type: UNSET_FETCHING
});
