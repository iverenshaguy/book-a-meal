import instance from '../config/axios';
import { errorHandler } from '../utils';
import authAPI from '../utils/api/authAPI';
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

/**
 * @function authenticating
 * @returns {object} action
 */
export const authenticating = () => ({
  type: AUTHENTICATING
});

/**
 * @function signinSuccess
 * @param {object} user
 * @returns {object} action
 */
export const signinSuccess = user => ({
  type: SIGNIN_SUCCESS,
  payload: user
});

/**
 * @function signinSuccess
 * @param {string} error
 * @returns {object} action
 */
export const signinFailure = error => ({
  type: SIGNIN_ERROR,
  payload: error
});

/**
 * @function signupSuccess
 * @param {object} user
 * @returns {object} action
 */
export const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: user
});

/**
 * @function signupFailure
 * @param {string} error
 * @returns {object} action
 */
export const signupFailure = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

/**
 * @function authenticationSuccess
 * @param {object} user
 * @returns {object} action
 */
export const authenticationSuccess = user => ({
  type: AUTHENTICATED,
  payload: user
});

/**
 * @function authenticationFailure
 * @param {string} error
 * @returns {object} action
 */
export const authenticationFailure = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error
});

/**
 * @function clearAuthError
 * @returns {object} action
 */
export const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
});

/**
 * @function resetUser
 * @returns {object} action
 */
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
