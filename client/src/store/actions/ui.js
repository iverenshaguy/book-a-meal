import { TOGGLE_MODAL } from '../types';

const toggleModal = modal => ({
  type: TOGGLE_MODAL,
  payload: modal || null
});

export default {
  toggleModal
};
