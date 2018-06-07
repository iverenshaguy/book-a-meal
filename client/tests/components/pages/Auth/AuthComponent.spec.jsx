import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import AuthComponent from '../../../../src/app/pages/Auth/AuthComponent';
import Auth from '../../../../src/app/pages/Auth';
import LinkBtn from '../../../../src/app/shared/Link';
import initialValues from '../../../../tests/setup/initialValues';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialValues);

const dispatchMock = jest.fn();

const props = {
  submitting: false,
  isAuthenticated: false,
  submitError: null,
  dispatch: dispatchMock
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

describe('AuthComponent', () => {
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
    const comp = (<Provider store={store}><Auth {...props} store={store} location={signinLocation} type="signin" /></Provider>);
    const compWillMountSpy = jest.spyOn(AuthComponent.prototype, 'componentWillMount');
    const mountedWrapper = mount(comp, rrcMock.get());

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    expect(compWillMountSpy).toHaveBeenCalled();
    mountedWrapper.unmount();
  });

  it('sets state on mount: siginn', () => {
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

  it('changes form correctly', () => {
    const comp = (<Provider store={store}><Auth {...props} location={customerSignupLocation} type="signup" /></Provider>);
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
