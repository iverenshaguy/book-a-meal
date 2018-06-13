import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import AuthComponent from '../../../../src/app/pages/Auth/AuthComponent';
import Auth from '../../../../src/app/pages/Auth';
import LinkBtn from '../../../../src/app/shared/Link';
import { initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

const unAuthStore = mockStore({
  ...initialValues,
  auth: { ...initialValues.auth, isAuthenticated: false }
});

const props = {
  submitting: false,
  isAuthenticated: false,
  submitError: null,
  changeUrl: jest.fn()
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

describe('AuthComponent', () => {
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

  it('renders caterer\'s signup form correctly', () => {
    const wrapper = shallow(<AuthComponent {...props} location={catererSignupLocation} type="signup" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders connected signin component correctly', () => {
    const comp = (<Provider store={unAuthStore}><Auth {...props} location={signinLocation} type="signin" /></Provider>);
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

  it('sets state on mount: catererSignup', () => {
    const comp = (<Auth store={store} {...props} location={catererSignupLocation} type="signup" />);
    const wrapper = mount(comp, rrcMock.get());

    expect(wrapper.find('Redirect')).toBeTruthy();
  });

  it('changes form correctly', () => {
    const comp = (<Provider store={unAuthStore}><Auth {...props} isAuthenticated={false} location={customerSignupLocation} type="signup" /></Provider>);
    const mountedWrapper = mount(comp, rrcMock.get());
    const changeFormSpy = jest.spyOn(mountedWrapper.find(AuthComponent).instance(), 'changeForm');

    mountedWrapper.find(LinkBtn).at(1).simulate('click');
    expect(changeFormSpy).toHaveBeenCalled();

    mountedWrapper.find(LinkBtn).at(0).simulate('click');
    expect(changeFormSpy).toHaveBeenCalled();

    mountedWrapper.find(LinkBtn).at(0).simulate('click');
    expect(changeFormSpy).toHaveBeenCalled();

    mountedWrapper.unmount();
  });
});
