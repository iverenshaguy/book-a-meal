import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import { operations } from '../../../src/app/pages/Auth/duck';

const {
  authenticating,
  signinSuccess,
  signinFailure,
  auth
} = operations;

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NDQ0NzkwLCJleHAiOjE1MTU1MzExOTB9.6d1VznIz8slZFioUzvC4KNGDlz_YsUNy95g2LPaEnJE';

const user = {
  firstname: 'Jane',
  lastname: 'Smithy',
  email: 'janesmithy@gmail.com',
  password: 'janesmithy',
  passwordConfirm: 'janesmithy',
};

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

  test('signinSuccess', () => {
    const data = { name: 'Emiola' };
    const authAction = signinSuccess(data);

    expect(authAction).toEqual({ type: 'SIGNIN_SUCCESS', payload: { name: 'Emiola' } });
  });

  test('signinFailure', () => {
    const authAction = signinFailure('error');

    expect(authAction).toEqual({ type: 'SIGNIN_ERROR', payload: 'error' });
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
          response: { user, token }
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
          console.log(dispatchedActions);

          const actionTypes = dispatchedActions.map(action => action.type);
          console.log(actionTypes);

          expect(actionTypes).toEqual(expectedActions);
          expect(localStorage.getItem('jwtToken')).toEqual(undefined);
        });
      });
    });
  });
});
