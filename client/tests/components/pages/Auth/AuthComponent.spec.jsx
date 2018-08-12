import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import AuthComponent from '../../../../src/components/pages/Auth';
import AuthContainer from '../../../../src/containers/pages/Auth';
import { initialState } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

const unAuthStore = mockStore({
  ...initialState,
  auth: { ...initialState.auth, isAuthenticated: false }
});

const props = {
  submitting: false,
  isAuthenticated: false,
  submitError: null,
  changeUrl: jest.fn(),
};

const signinLocation = {
  pathname: '/signin',
  state: { from: { pathname: '/' } },
};

const catererSignupLocation = {
  pathname: '/signup',
  state: { from: { pathname: '/' } },
  search: '?role=caterer'
};

const customerSignupLocation = {
  pathname: '/signup',
  state: { from: { pathname: '/' } },
  search: '?role=customer'
};
const { now } = Date;

describe('Auth', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders signin form correctly', () => {
    const wrapper = shallow(<AuthComponent {...props} location={signinLocation} type="signin" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders customer\'s signup form correctly', () => {
    const wrapper = shallow(<AuthComponent {...props} location={customerSignupLocation} type="signup" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders connected signin component correctly', () => {
    const comp = (<Provider store={unAuthStore}><AuthContainer {...props} location={signinLocation} type="signin" /></Provider>);
    const mountedWrapper = mount(comp, rrcMock.get());

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('sets state on mount: signin', () => {
    const comp = (<AuthComponent {...props} location={customerSignupLocation} type="signin" />);
    const wrapper = shallow(comp);

    expect(wrapper.state().type).toEqual('signin');
  });

  it('sets state on mount: customerSignup', () => {
    const comp = (<AuthComponent {...props} location={customerSignupLocation} type="signup" />);
    const wrapper = shallow(comp);

    expect(wrapper.state().type).toEqual('customerSignup');
  });

  it('sets state on mount: catererSignup', () => {
    const comp = (<AuthComponent {...props} location={catererSignupLocation} type="signup" />);
    const wrapper = shallow(comp);

    expect(wrapper.state().type).toEqual('catererSignup');
  });

  it('renders caterer\'s signup form correctly', () => {
    const wrapper = shallow(<AuthComponent {...props} location={catererSignupLocation} type="signup" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('sets state on mount: catererSignup', () => {
    const comp = (<AuthContainer store={store} {...props} location={catererSignupLocation} type="catererSignup" />);
    const wrapper = mount(comp, rrcMock.get());

    expect(wrapper.find('Redirect')).toBeTruthy();
  });
});
