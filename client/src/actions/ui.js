import { TOGGLE_MODAL, TOGGLE_SIDENAV } from './actionTypes';

export const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal || null
});

export const toggleSideNav = () => ({
  type: TOGGLE_SIDENAV
});
