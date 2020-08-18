import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../src/config/axios';
import { authenticateUser } from '../../src/actions/auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false
});

describe('Axios Instance', () => {
  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('should reload page when provided token is expired', () => {
    window.location.reload = jest.fn();

    moxios.stubRequest('/api/v1/auth/refresh_token', {
      status: 403,
      response: {
        error: 'User authorization token is expired'
      }
    }, 5);

    return store.dispatch(authenticateUser()).then(() => {
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
