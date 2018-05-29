import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import instance from '../../../src/config/axios';
import operations from '../../../src/store/operations/auth';
import { newCustomer } from '../../setup/data';

const {
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
  logout
} = operations;

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE';

// configure Mock store
const store = mockStore({
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false
});

describe('Auth Actions', () => {
  test('authenticating', () => {
    const authAction = authenticating();

    expect(authAction).toEqual({ type: 'AUTHENTICATING' });
  });

  test('authenticationSuccess', () => {
    const data = { name: 'Emiola' };
    const authAction = authenticationSuccess(data);

    expect(authAction).toEqual({ type: 'AUTHENTICATED', payload: { name: 'Emiola' } });
  });

  test('authenticationFailure', () => {
    const authAction = authenticationFailure('error');

    expect(authAction).toEqual({ type: 'AUTHENTICATION_ERROR', payload: 'error' });
  });

  test('signinSuccess', () => {
    const data = { name: 'Emiola' };
    const authAction = signinSuccess(data);

    expect(authAction).toEqual({ type: 'SIGNIN_SUCCESS', payload: { name: 'Emiola' } });
  });

  test('signinFailure', () => {
    const authAction = signinFailure('error');

    expect(authAction).toEqual({ type: 'SIGNIN_ERROR', payload: 'error' });
  });

  test('signupSuccess', () => {
    const data = { name: 'Emiola' };
    const authAction = signupSuccess(data);

    expect(authAction).toEqual({ type: 'SIGNUP_SUCCESS', payload: { name: 'Emiola' } });
  });

  test('signupFailure', () => {
    const authAction = signupFailure('error');

    expect(authAction).toEqual({ type: 'SIGNUP_ERROR', payload: 'error' });
  });

  test('clearAuthError', () => {
    const authAction = clearAuthError();

    expect(authAction).toEqual({ type: 'CLEAR_AUTH_ERROR' });
  });

  test('resetUser', () => {
    const authAction = resetUser();

    expect(authAction).toEqual({ type: 'UNAUTHENTICATED' });
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

      it('dispatches AUTHENTICATING and SIGNIN_SUCCESS on successful signin', () => {
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

      it('dispatches AUTHENTICATING and SIGNIN_ERROR on unsuccessful signin', () => {
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

      it('dispatches AUTHENTICATING and SIGNUP_SUCCESS on successful signup', () => {
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

      it('dispatches AUTHENTICATING and SIGNUP_ERROR on unsuccessful signup', () => {
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

      it('dispatches UNAUTHENTICATED', () => {
        store.dispatch(logout());

        const expectedActions = ['UNAUTHENTICATED'];

        const dispatchedActions = store.getActions();

        const actionTypes = dispatchedActions.map(action => action.type);


        expect(actionTypes).toEqual(expectedActions);
        expect(localStorage.getItem('jwtToken')).toEqual(undefined);
      });
    });

    describe('Token Refresh', () => {
      beforeEach(() => {
        moxios.install(instance);
      });

      afterEach(() => {
        moxios.uninstall(instance);
      });

      it('dispatches AUTHENTICATING and AUTHENTICATION_SUCCESS on successful authentication', () => {
        const expectedActions = ['AUTHENTICATING', 'AUTHENTICATED'];

        moxios.stubRequest(`${url}/auth/refreshToken`, {
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

      it('dispatches AUTHENTICATING and AUTHENTICATION_ERROR on unsuccessful authentication', () => {
        const expectedActions = ['AUTHENTICATING', 'AUTHENTICATION_ERROR'];

        moxios.stubRequest(`${url}/auth/refreshToken`, {
          status: 500
        }, 5);

        return store.dispatch(authenticateUser()).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });
    });
  });
});
