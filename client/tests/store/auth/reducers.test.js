import reducer from '../../../src/app/pages/Auth/duck';

const state = {
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false
};

describe('Auth Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle AUTHENTICATING action', () => {
    const newState = reducer(state, {
      type: 'AUTHENTICATING'
    });

    expect(newState).toEqual({ ...state, loading: true });
  });

  it('should handle SIGNIN_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'SIGNIN_SUCCESS',
      payload: { name: 'Emily' },
    });

    expect(newState).toEqual({
      isAuthenticated: true,
      user: { name: 'Emily' },
      error: null,
      loading: false
    });
  });

  it('should handle SIGNIN_ERROR action', () => {
    const newState = reducer(state, {
      type: 'SIGNIN_ERROR',
      payload: 'Error',
    });

    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      error: 'Error',
      loading: false
    });
  });

  it('should handle CLEAR_AUTH_ERROR action', () => {
    const newState = reducer(state, {
      type: 'CLEAR_AUTH_ERROR'
    });

    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      error: null,
      loading: false
    });
  });
});
