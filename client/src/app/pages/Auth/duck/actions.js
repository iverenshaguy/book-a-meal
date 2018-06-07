import {
  AUTHENTICATING,
  CLEAR_AUTH_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
} from './types';

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

const clearAuthError = () => ({
  type: CLEAR_AUTH_ERROR
});

export default {
  signinSuccess,
  signinFailure,
  authenticating,
  clearAuthError,
};
