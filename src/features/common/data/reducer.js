import { SET_FETCHING, UNSET_FETCHING, TOGGLE_MODAL, TOGGLE_SIDENAV } from 'src/features/common/constants/actionTypes';

/**
 * Fetching Reducer
 * @param {string} state defaults to false
 * @param {string} action action object (type, payload)
 * @returns {string} new state
 */
export const isFetching = (state = false, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return true;
    case UNSET_FETCHING:
      return false;
    default:
      return state;
  }
};

const initialState = {
  modals: {
    open: false,
    type: null,
  },
  sideNav: {
    open: false,
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
          type: action.payload,
        },
      };
    case TOGGLE_SIDENAV:
      return {
        ...state,
        sideNav: {
          open: !state.sideNav.open,
        },
      };
    default:
      return state;
  }
};
