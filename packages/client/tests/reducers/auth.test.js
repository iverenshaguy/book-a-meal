import reducer from '../../src/reducers/auth';
import { customerOrder } from '../setup/mockData';

const state = {
  isAuthenticated: false,
  error: null,
  user: {},
  loading: false,
  mailSendSuccess: false,
  passwordSetSuccess: false,
  working: false,
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

  it('should handle SET_AUTH_WORKING action', () => {
    const newState = reducer(state, {
      type: 'SET_AUTH_WORKING'
    });

    expect(newState).toEqual({ ...state, working: true });
  });

  it('should handle UNSET_AUTH_WORKING action', () => {
    const newState = reducer({ ...state, working: true }, {
      type: 'UNSET_AUTH_WORKING'
    });

    expect(newState).toEqual({ ...state, working: false });
  });

  it('should handle PASSWORD_SET_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'PASSWORD_SET_SUCCESS'
    });

    expect(newState).toEqual({ ...state, passwordSetSuccess: true });
  });

  it('should handle PASSWORD_SET_ERROR action', () => {
    const newState = reducer({ ...state, passwordSetSuccess: true }, {
      type: 'PASSWORD_SET_ERROR',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, passwordSetSuccess: false, error: 'Error' });
  });

  it('should handle MAIL_SEND_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'MAIL_SEND_SUCCESS'
    });

    expect(newState).toEqual({ ...state, mailSendSuccess: true });
  });

  it('should handle MAIL_SEND_ERROR action', () => {
    const newState = reducer({ ...state, mailSendSuccess: true }, {
      type: 'MAIL_SEND_ERROR',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, mailSendSuccess: false, error: 'Error' });
  });

  it('should handle SIGNIN_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'SIGNIN_SUCCESS',
      payload: { name: 'Emily' },
    });

    expect(newState).toEqual({
      ...state,
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
      ...state,
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
      ...state,
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
      ...state,
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
      ...state,
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
      ...state,
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
      ...state,
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
      ...state,
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
