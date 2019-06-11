import { toastr } from 'react-redux-toastr';
import instance from '../config/axios';
import errorHandler from '../helpers/errorHandler';
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
  SET_AUTH_WORKING,
  UNSET_AUTH_WORKING,
  PASSWORD_SET_SUCCESS,
  PASSWORD_SET_ERROR,
  MAIL_SEND_SUCCESS,
  MAIL_SEND_ERROR
} from '../constants/actionTypes';

/**
 * @function authenticating
 * @returns {object} action
 */
export const authenticating = () => ({
  type: AUTHENTICATING
});

/**
 * @function setAuthWorking
 * @returns {object} action
 */
export const setAuthWorking = () => ({
  type: SET_AUTH_WORKING
});

/**
 * @function unsetAuthWorking
 * @returns {object} action
 */
export const unsetAuthWorking = () => ({
  type: UNSET_AUTH_WORKING
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
 * @function mailSendSuccess
 * @param {object} user
 * @returns {object} action
 */
export const mailSendSuccess = user => ({
  type: MAIL_SEND_SUCCESS,
  payload: user
});

/**
 * @function mailSendFailure
 * @param {string} error
 * @returns {object} action
 */
export const mailSendFailure = error => ({
  type: MAIL_SEND_ERROR,
  payload: error
});

/**
 * @function passwordSetSuccess
 * @param {object} user
 * @returns {object} action
 */
export const passwordSetSuccess = user => ({
  type: PASSWORD_SET_SUCCESS,
  payload: user
});

/**
 * @function passwordSetFailure
 * @param {string} error
 * @returns {object} action
 */
export const passwordSetFailure = error => ({
  type: PASSWORD_SET_ERROR,
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
 * Sends a mail to user email with token to reset password
 * @function forgotPassword
 * @param {object} user (containing email as a string)
 * @param {func} dispatch
 * @returns {void}
 */
export const forgotPassword = user => async (dispatch) => {
  try {
    dispatch(setAuthWorking());

    const response = await instance.post('/auth/forgot_password', user);

    dispatch(mailSendSuccess(response.data));
    toastr.success('Mail Sent Successfully');
    dispatch(unsetAuthWorking());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(mailSendFailure(errorResponse.response));
    dispatch(unsetAuthWorking());
  }
};

/**
 * Resets a user's password
 * @function resetPassword
 * @param {string} token
 * @param {string} email
 * @param {object} user (containing password as a string)
 * @param {func} dispatch
 * @returns {void}
 */
export const resetPassword = (token, email) => user => async (dispatch) => {
  try {
    dispatch(setAuthWorking());

    const response = await instance.post(`/auth/reset_password?token=${token}&email=${email}`, user);

    dispatch(passwordSetSuccess(response.data));
    toastr.success('Password Reset Successfully');
    dispatch(unsetAuthWorking());
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(passwordSetFailure(errorResponse.response));
    dispatch(unsetAuthWorking());
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
