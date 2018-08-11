import reducer from '../../../src/store/reducers/auth';
import { customerOrder } from '../../setup/mockData';

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

  it('should handle AUTHENTICATED action', () => {
    const newState = reducer(state, {
      type: 'AUTHENTICATED',
      payload: { name: 'Emily' },
    });

    expect(newState).toEqual({
      isAuthenticated: true,
      user: { name: 'Emily' },
      error: null,
      loading: false
    });
  });

  it('should handle UNAUTHENTICATED action', () => {
    const newState = reducer(state, {
      type: 'UNAUTHENTICATED'
    });

    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      error: null,
      loading: false
    });
  });

  it('should handle SIGNUP_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'SIGNUP_SUCCESS',
      payload: { name: 'Emily' },
    });

    expect(newState).toEqual({
      isAuthenticated: true,
      user: { name: 'Emily' },
      error: null,
      loading: false
    });
  });

  it('should handle SIGNUP_ERROR action', () => {
    const newState = reducer(state, {
      type: 'SIGNUP_ERROR',
      payload: 'Error',
    });

    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      error: 'Error',
      loading: false
    });
  });

  it('should handle AUTHENTICATION_ERROR action', () => {
    const newState = reducer(state, {
      type: 'AUTHENTICATION_ERROR',
      payload: 'Error',
    });

    expect(newState).toEqual({
      isAuthenticated: false,
      user: {},
      error: 'Error',
      loading: false
    });
  });

  it('should handle ADD_ORDER_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'ADD_ORDER_SUCCESS',
      payload: customerOrder
    });

    expect(newState).toEqual({
      ...state,
      user: {
        ...state.user,
        phoneNo: customerOrder.deliveryPhoneNo,
        address: customerOrder.deliveryAddress,
      },
    });
  });
});
