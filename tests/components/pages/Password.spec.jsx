import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import PasswordComponent from '../../../src/components/pages/Password';
import PasswordContainer from '../../../src/containers/pages/Password';
import { initialState } from '../../setup/mockData';

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
  passwordSetSuccess: false,
  mailSendSuccess: false
};

const forgotPasswordLocation = {
  pathname: '/forgot_password',
  state: { from: { pathname: '/' } },
};

const resetPasswordLocation = {
  pathname: '/reset_password',
  state: { from: { pathname: '/' } },
};

describe('Password', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Forgot Password Form component correctly', () => {
    const wrapper = shallow(<PasswordComponent {...props} location={forgotPasswordLocation} type="forgotPassword" />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Reset Password form component correctly', () => {
    const wrapper = shallow(<PasswordComponent {...props} location={resetPasswordLocation} type="resetPassword" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render success message when password is set succesfully', () => {
    const wrapper = shallow(<PasswordComponent {...props} location={resetPasswordLocation} passwordSetSuccess type="resetPassword" />);

    expect(wrapper.find('.password-div p').text()).toEqual('Password Reset Successful. Please Sign In Below.');
  });

  it('should render invalid token error when token is invalid', () => {
    const wrapper = shallow(<PasswordComponent
      {...props}
      location={resetPasswordLocation}
      type="resetPassword"
      submitError="Password reset token is invalid or has expired"
    />);

    expect(wrapper.find('.password-div p').text()).toEqual('Password reset token is invalid or has expired.');
  });

  it('should render success message when reset token mail is sent successfully', () => {
    const wrapper = shallow(<PasswordComponent {...props} location={resetPasswordLocation} mailSendSuccess type="forgotPassword" />);

    expect(wrapper.find('p.text-center').text()).toEqual('A mail with a reset token has been sent to your mail.');
  });

  it('should render Password component that is connected to the redux store correctly', () => {
    const comp = (<Provider store={unAuthStore}><PasswordContainer {...props} location={forgotPasswordLocation} type="forgotPassword" /></Provider>);
    const mountedWrapper = mount(comp, rrcMock.get());

    expect(toJson(mountedWrapper)).toMatchSnapshot();
    mountedWrapper.unmount();
  });

  it('should redirect use to the homepage when the user is already authenticated', () => {
    const comp = (<PasswordContainer store={store} {...props} location={forgotPasswordLocation} type="forgotPassword" />);
    const wrapper = mount(comp, rrcMock.get());

    expect(wrapper.find('Redirect')).toBeTruthy();
    expect(wrapper.find('Redirect').props().to).toEqual('/');
  });
});
