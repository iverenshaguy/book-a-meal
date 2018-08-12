import instance from '../config/axios';
import { errorHandler } from '../utils';
import { auth as authAPI } from '../utils/api/auth';
import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  AUTHENTICATING,
  CLEAR_AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
} from './actionTypes';

export const authenticating = () => ({
  type: AUTHENTICATING
});

export const signinSuccess = data => ({
  type: SIGNIN_SUCCESS,
  payload: data
});

export const signinFailure = error => ({
  type: SIGNIN_ERROR,
  payload: error
});

export const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data
});

export const signupFailure = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

export const authenticationSuccess = data => ({
  type: AUTHENTICATED,
  payload: data
});

export const authenticationFailure = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error
});

export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
});

export const resetUser = () => ({
  type: UNAUTHENTICATED
});

/**
 * Authenticates User
 * @function auth
 * @param {string} type
 * @param {object} user
 * @param {func} dispatch
 * @returns {void}
 */
export const auth = type => user => async (dispatch) => {
  try {
    dispatch(authenticating());

    const response = await authAPI(type)(user);

    localStorage.setItem('jwtToken', response.data.token);

    const dispatchType = type === 'signin' ? signinSuccess : signupSuccess;

    dispatch(dispatchType(response.data.user));
  } catch (error) {
    const errorResponse = errorHandler(error);

    const dispatchType = type === 'signin' ? signinFailure : signupFailure;

    dispatch(dispatchType(errorResponse.response));
  }
};

/**
 * Refreshe User Token
 * @function authenticateUser
 * @param {func} dispatch
 * @returns {void}
 */
export const authenticateUser = () => async (dispatch) => {
  try {
    dispatch(authenticating());

    const res = await instance.get('/auth/refresh_token');

    localStorage.setItem('jwtToken', res.data.token);

    dispatch(authenticationSuccess(res.data.user));
  } catch (error) {
    const errorResponse = errorHandler(error);

    localStorage.removeItem('jwtToken');

    dispatch(authenticationFailure(errorResponse.response));
  }
};

/**
 * Logs user out
 * @function logout
 * @param {func} dispatch
 * @returns {void}
 */
export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch(resetUser());
};
