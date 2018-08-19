import { TOGGLE_MODAL, TOGGLE_SIDENAV } from '../actions/actionTypes';

const initialState = {
  modals: {
    open: false,
    type: null
  },
  sideNav: {
    open: false
  },
};

/**
 * UI Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action object (type, payload)
 * @returns {object} new state
 */
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
    case TOGGLE_SIDENAV:
      return {
        ...state,
        sideNav: {
          open: !state.sideNav.open,
        }
      };
    default:
      return state;
  }
};
