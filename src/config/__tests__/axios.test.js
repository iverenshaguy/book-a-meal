import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from 'src/config/axios';
import { authenticateUser } from 'src/features/auth/data/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false,
});

describe('Axios Instance', () => {
  const copyOfWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { assign: jest.fn() },
    });

    moxios.install(instance);
  });

  afterEach(() => {
    window.location = copyOfWindowLocation;
    moxios.uninstall(instance);
  });

  it('should reload page when provided token is expired', (done) => {
    window.location.reload = jest.fn();

    moxios.stubRequest(
      '/api/v1/actions/refresh_token',
      {
        status: 403,
        response: {
          error: 'User authorization token is expired',
        },
      },
      5
    );

    store.dispatch(authenticateUser());

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 403,
          response: {
            error: 'User authorization token is expired',
          },
        })
        .then(() => {
          expect(window.location.reload).toHaveBeenCalled();
          done();
        });
    });
  });
});
