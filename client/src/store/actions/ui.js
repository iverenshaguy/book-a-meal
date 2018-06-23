import { TOGGLE_MODAL, TOGGLE_SIDENAV } from '../types';

const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal || null
});

const toggleSideNav = () => ({
  type: TOGGLE_SIDENAV
});

export default {
  toggleModal,
  toggleSideNav
};
