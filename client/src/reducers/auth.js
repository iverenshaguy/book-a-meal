import {
  AUTHENTICATED,
  AUTHENTICATING,
  UNAUTHENTICATED,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  ADD_ORDER_SUCCESS,
  EDIT_ORDER_SUCCESS,
  CLEAR_AUTH_ERROR,
  AUTHENTICATION_ERROR,
} from '../actions/actionTypes';

const initialState = {
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  error: null,
  user: {},
  loading: false
};

/**
 * Authentication Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action object (type, payload)
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return { ...state, loading: true };
    case AUTHENTICATED:
    case SIGNIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false
      };
    case UNAUTHENTICATED:
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        loading: false
      };
    case AUTHENTICATION_ERROR:
    case SIGNIN_ERROR:
    case SIGNUP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.payload,
        loading: false
      };
    case ADD_ORDER_SUCCESS:
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: action.payload.deliveryAddress,
          phoneNo: action.payload.deliveryPhoneNo
        }
      };
    default:
      return state;
  }
};
