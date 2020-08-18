import { TOGGLE_MODAL, TOGGLE_SIDENAV } from '../constants/actionTypes';

/**
 * @function toggleModal
 * @param {string} modal modal name default is null
 * @returns {object} action
 */
export const toggleModal = (modal = null) => ({
  type: TOGGLE_MODAL,
  payload: modal
});

/**
 * @function toggleSideNav
 * @returns {object} action
 */
export const toggleSideNav = () => ({
  type: TOGGLE_SIDENAV
});
