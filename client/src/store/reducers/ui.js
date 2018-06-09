import { TOGGLE_MODAL } from '../types';

const initialState = {
  modals: {
    open: false,
    type: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        ...state,
        modals: {
          open: !state.modals.open,
          type: action.payload
        }
      };
    default:
      return state;
  }
};
