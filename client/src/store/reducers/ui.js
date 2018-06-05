import { TOGGLE_MODAL } from '../types';

const initialState = {
  modals: {
    isOpen: false,
    type: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modals: {
          isOpen: !state.modals.isOpen,
          type: action.payload
        }
      };
    default:
      return state;
  }
};
