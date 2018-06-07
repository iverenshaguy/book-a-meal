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
} from '../types';

const authenticating = () => ({
  type: AUTHENTICATING
});

const signinSuccess = data => ({
  type: SIGNIN_SUCCESS,
  payload: data
});

const signinFailure = error => ({
  type: SIGNIN_ERROR,
  payload: error
});

const signupSuccess = data => ({
  type: SIGNUP_SUCCESS,
  payload: data
});

const signupFailure = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

const authenticationSuccess = data => ({
  type: AUTHENTICATED,
  payload: data
});

const authenticationFailure = error => ({
  type: AUTHENTICATION_ERROR,
  payload: error
});

const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
});

const resetUser = () => ({
  type: UNAUTHENTICATED
});

export default {
  resetUser,
  signinSuccess,
  signinFailure,
  authenticating,
  clearAuthError,
  signupSuccess,
  signupFailure,
  authenticationSuccess,
  authenticationFailure,
};
