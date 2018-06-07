import {
  AUTHENTICATING,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  CLEAR_AUTH_ERROR
} from './types';

const initialState = {
  isAuthenticated: !!localStorage.getItem('jwtToken'),
  error: null,
  user: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATING:
      return { ...state, loading: true };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        loading: false
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
