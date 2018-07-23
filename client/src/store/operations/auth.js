import instance from '../../config/axios';
import { errorHandler } from '../../utils';
import { auth as authAPI } from '../../services/api/auth';
import {
  resetUser,
  signinSuccess,
  signinFailure,
  signupSuccess,
  signupFailure,
  authenticating,
  clearAuthError,
  authenticationSuccess,
  authenticationFailure,
} from '../actions/auth';

const auth = type => user => async (dispatch) => {
  try {
    dispatch(authenticating());

    const response = await authAPI(type)(user);

    localStorage.setItem('jwtToken', response.data.token);

    // if type is signin dispatch signinSuccess else dispatch signupSuccess
    const dispatchType = type === 'signin' ? signinSuccess : signupSuccess;
    dispatch(dispatchType(response.data.user));
  } catch (error) {
    const errorResponse = errorHandler(error);

    // if type is signin dispatch signinFailure else dispatch signupFailure
    const dispatchType = type === 'signin' ? signinFailure : signupFailure;
    dispatch(dispatchType(errorResponse.response));
  }
};

const authenticateUser = () => async (dispatch) => {
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

const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch(resetUser());
};

export default {
  auth,
  logout,
  resetUser,
  signinSuccess,
  signinFailure,
  signupSuccess,
  signupFailure,
  authenticating,
  clearAuthError,
  authenticateUser,
  authenticationSuccess,
  authenticationFailure,
};
