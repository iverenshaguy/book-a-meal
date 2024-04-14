import { SET_FETCHING, UNSET_FETCHING, TOGGLE_MODAL, TOGGLE_SIDENAV } from 'src/features/common/constants/actionTypes';

/**
 * @function setFetching
 * @returns {object} action
 */
export const setFetching = () => ({
  type: SET_FETCHING,
});

/**
 * @function unsetFetching
 * @returns {object} action
 */
export const unsetFetching = () => ({
  type: UNSET_FETCHING,
});

/**
 * @function toggleModal
 * @param {string} modal modal name default is null
 * @returns {object} action
 */
export const toggleModal = (modal = null) => ({
  type: TOGGLE_MODAL,
  payload: modal,
});

/**
 * @function toggleSideNav
 * @returns {object} action
 */
export const toggleSideNav = () => ({
  type: TOGGLE_SIDENAV,
});
