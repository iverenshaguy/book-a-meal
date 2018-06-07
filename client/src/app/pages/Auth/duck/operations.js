import { errorHandler } from '../../../../utils';
import { auth as authAPI } from '../../../../services/api/auth';
import {
  signinSuccess,
  signinFailure,
  authenticating,
  clearAuthError,
} from './actions';

const auth = type => user => async (dispatch) => {
  try {
    dispatch(authenticating());

    const response = await authAPI(type)(user);

    localStorage.setItem('jwtToken', response.data.token);

    dispatch(signinSuccess(response.data.user));
  } catch (error) {
    const errorResponse = errorHandler(error);

    dispatch(signinFailure(errorResponse.response));
  }
};

export default {
  auth,
  signinSuccess,
  signinFailure,
  authenticating,
  clearAuthError,
};
