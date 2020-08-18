import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import MockAdapter from 'axios-mock-adapter';
import instance from '../../src/config/axios';
import { newCustomer } from '../setup/mockData';
import {
  authenticating,
  authenticationSuccess,
  authenticationFailure,
  signinSuccess,
  signinFailure,
  signupSuccess,
  signupFailure,
  clearAuthError,
  resetUser,
  auth,
  authenticateUser,
  logout,
  forgotPassword,
  resetPassword,
  setAuthWorking,
  unsetAuthWorking,
  passwordSetSuccess,
  passwordSetFailure,
  mailSendSuccess,
  mailSendFailure
} from '../../src/actions/auth';

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockReq = new MockAdapter(instance);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE';

// configure Mock store
const store = mockStore({
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false
});

describe('Auth Actions', () => {
  describe('authenticating', () => {
    it('should return an object with type AUTHENTICATING', () => {
      const authAction = authenticating();

      expect(authAction).toEqual({ type: 'AUTHENTICATING' });
    });
  });

  describe('authenticationSuccess', () => {
    it('should return an object with type AUTHENTICATED', () => {
      const userDetails = { name: 'Emiola' };
      const authAction = authenticationSuccess(userDetails);

      expect(authAction).toEqual({ type: 'AUTHENTICATED', payload: { name: 'Emiola' } });
    });
  });

  describe('authenticationFailure', () => {
    it('should return an object with type AUTHENTICATION_ERROR', () => {
      const authAction = authenticationFailure('error');

      expect(authAction).toEqual({ type: 'AUTHENTICATION_ERROR', payload: 'error' });
    });
  });

  describe('setAuthWorking', () => {
    it('should return an object with type SET_AUTH_WORKING', () => {
      const authAction = setAuthWorking();

      expect(authAction).toEqual({ type: 'SET_AUTH_WORKING' });
    });
  });

  describe('unsetAuthWorking', () => {
    it('should return an object with type UNSET_AUTH_WORKING', () => {
      const authAction = unsetAuthWorking();

      expect(authAction).toEqual({ type: 'UNSET_AUTH_WORKING' });
    });
  });

  describe('passwordSetSuccess', () => {
    it('should return an object with type PASSWORD_SET_SUCCESS', () => {
      const authAction = passwordSetSuccess({ message: 'Successful' });

      expect(authAction).toEqual({ type: 'PASSWORD_SET_SUCCESS', payload: { message: 'Successful' } });
    });
  });

  describe('passwordSetFailure', () => {
    it('should return an object with type PASSWORD_SET_ERROR', () => {
      const authAction = passwordSetFailure('error');

      expect(authAction).toEqual({ type: 'PASSWORD_SET_ERROR', payload: 'error' });
    });
  });

  describe('mailSendSuccess', () => {
    it('should return an object with type MAIL_SEND_SUCCESS', () => {
      const authAction = mailSendSuccess({ message: 'Successful' });

      expect(authAction).toEqual({ type: 'MAIL_SEND_SUCCESS', payload: { message: 'Successful' } });
    });
  });

  describe('mailSendFailure', () => {
    it('should return an object with type MAIL_SEND_ERROR', () => {
      const authAction = mailSendFailure('error');

      expect(authAction).toEqual({ type: 'MAIL_SEND_ERROR', payload: 'error' });
    });
  });

  describe('signinSuccess', () => {
    it('should return an object with type SIGNIN_SUCCESS', () => {
      const userDetails = { name: 'Emiola' };
      const authAction = signinSuccess(userDetails);

      expect(authAction).toEqual({ type: 'SIGNIN_SUCCESS', payload: { name: 'Emiola' } });
    });
  });

  describe('signinFailure', () => {
    it('should return an object with type SIGNIN_ERROR', () => {
      const authAction = signinFailure('error');

      expect(authAction).toEqual({ type: 'SIGNIN_ERROR', payload: 'error' });
    });
  });

  describe('signupSuccess', () => {
    it('should return an object with type SIGNUP_SUCCESS', () => {
      const userDetails = { name: 'Emiola' };
      const authAction = signupSuccess(userDetails);

      expect(authAction).toEqual({ type: 'SIGNUP_SUCCESS', payload: { name: 'Emiola' } });
    });
  });

  describe('signupFailure', () => {
    it('should return an object with type SIGNUP_ERROR', () => {
      const authAction = signupFailure('error');

      expect(authAction).toEqual({ type: 'SIGNUP_ERROR', payload: 'error' });
    });
  });

  describe('clearAuthError', () => {
    it('should return an object with type CLEAR_AUTH_ERROR', () => {
      const authAction = clearAuthError();

      expect(authAction).toEqual({ type: 'CLEAR_AUTH_ERROR' });
    });
  });

  describe('resetUser', () => {
    it('should return an object with type UNAUTHENTICATED', () => {
      const authAction = resetUser();

      expect(authAction).toEqual({ type: 'UNAUTHENTICATED' });
    });
  });

  describe('Auth Operations', () => {
    afterEach(() => {
      store.clearActions();
      localStorage.clear();
      jest.clearAllMocks();
    });

    describe('Authentication', () => {
      beforeEach(() => {
        moxios.install(axios);
      });

      afterEach(() => {
        moxios.uninstall(axios);
      });

      it('should dispatch AUTHENTICATING and SIGNIN_SUCCESS on successful signin', () => {
        const expectedActions = ['AUTHENTICATING', 'SIGNIN_SUCCESS'];

        moxios.stubRequest(`${url}/auth/signin`, {
          status: 200,
          response: { newCustomer, token }
        }, 5);

        return store.dispatch(auth('signin')({ email: 'iveren@shaguy.com', password: 'iverenshaguy' })).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(token);
        });
      });

      it('should dispatch AUTHENTICATING and SIGNIN_ERROR on unsuccessful signin', () => {
        const expectedActions = ['AUTHENTICATING', 'SIGNIN_ERROR'];

        moxios.stubRequest(`${url}/auth/signin`, {
          status: 401,
          response: {
            error: 'Invalid Credentials'
          },
        }, 5);

        return store.dispatch(auth('signin')({ email: 'iveren@shaguy.com', password: 'iverenshaguytt' })).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });

      it('should dispatch AUTHENTICATING and SIGNUP_SUCCESS on successful signup', () => {
        const expectedActions = ['AUTHENTICATING', 'SIGNUP_SUCCESS'];

        moxios.stubRequest(`${url}/auth/signup`, {
          status: 201,
          response: { newCustomer, token }
        }, 5);

        return store.dispatch(auth('signup')(newCustomer)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(token);
        });
      });

      it('should dispatch AUTHENTICATING and SIGNUP_ERROR on unsuccessful signup', () => {
        const expectedActions = ['AUTHENTICATING', 'SIGNUP_ERROR'];

        moxios.stubRequest(`${url}/auth/signup`, {
          status: 422,
          response: {
            errors: {
              email: 'This email is already registered'
            }
          }
        }, 5);

        return store.dispatch(auth('signup')({ ...newCustomer, email: 'iverenshaguy@gmail.com' })).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });

      it('should dispatch UNAUTHENTICATED', () => {
        store.dispatch(logout());

        const expectedActions = ['UNAUTHENTICATED'];

        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
        expect(localStorage.getItem('jwtToken')).toEqual(null);
      });
    });

    describe('Token Refresh', () => {
      beforeEach(() => {
        moxios.install(instance);
      });

      afterEach(() => {
        moxios.uninstall(instance);
      });

      it('should dispatch AUTHENTICATING and AUTHENTICATION_SUCCESS on successful authentication', () => {
        const expectedActions = ['AUTHENTICATING', 'AUTHENTICATED'];

        moxios.stubRequest(`${url}/auth/refresh_token`, {
          status: 200,
          response: { token, newCustomer }
        }, 5);

        return store.dispatch(authenticateUser()).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(token);
        });
      });

      it('should dispatch AUTHENTICATING and AUTHENTICATION_ERROR on unsuccessful authentication', () => {
        const expectedActions = ['AUTHENTICATING', 'AUTHENTICATION_ERROR'];

        moxios.stubRequest(`${url}/auth/refresh_token`, {
          status: 500
        });

        return store.dispatch(authenticateUser()).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });
    });

    describe('Password Reset', () => {
      it('should dispatch SET_AUTH_WORKING, MAIL_SEND_SUCCESS, and UNSET_AUTH_WORKING on forgot password success', () => {
        const expectedActions = ['SET_AUTH_WORKING', 'MAIL_SEND_SUCCESS', 'UNSET_AUTH_WORKING'];


        mockReq.onPost(`${url}/auth/forgot_password`).reply(200, { message: 'A reset token has been sent to your email address' });

        return store.dispatch(forgotPassword({ email: 'olisa@emodi.com' })).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('should dispatch SET_AUTH_WORKING, MAIL_SEND_ERROR, and UNSET_AUTH_WORKING on forgot password failure', () => {
        const expectedActions = ['SET_AUTH_WORKING', 'MAIL_SEND_ERROR', 'UNSET_AUTH_WORKING'];

        mockReq.onPost(`${url}/auth/forgot_password`).reply(500, { error: 'Error' });

        return store.dispatch(forgotPassword({ email: 'olisa@emodi.com' })).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('should dispatch SET_AUTH_WORKING, PASSWORD_SET_SUCCESS, and UNSET_AUTH_WORKING on reset password success', () => {
        const expectedActions = ['SET_AUTH_WORKING', 'PASSWORD_SET_SUCCESS', 'UNSET_AUTH_WORKING'];

        mockReq.onPost(`${url}/auth/reset_password?token=${token}&email=${newCustomer.email}`).reply(200, { message: 'A reset token has been sent to your email address' });

        return store.dispatch(resetPassword(token, newCustomer.email)({ password: 'olisaemodi' })).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('should dispatch SET_AUTH_WORKING, PASSWORD_SET_ERROR, and UNSET_AUTH_WORKING on reset password failure', () => {
        const expectedActions = ['SET_AUTH_WORKING', 'PASSWORD_SET_ERROR', 'UNSET_AUTH_WORKING'];


        mockReq.onPost(`${url}/auth/reset_password?token=${token}&email=${newCustomer.email}`).reply(500, { error: 'Error' });

        return store.dispatch(resetPassword(token, newCustomer.email)({ password: 'olisaemodi' })).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});
