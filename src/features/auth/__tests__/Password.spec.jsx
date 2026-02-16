import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import WrappedPassword, { Password } from 'src/features/auth/Password';
import { initialState } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

const unAuthStore = mockStore({
  ...initialState,
  auth: { ...initialState.auth, isAuthenticated: false },
});

const props = {
  submitting: false,
  isAuthenticated: false,
  submitError: null,
  passwordSetSuccess: false,
  mailSendSuccess: false,
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

  const renderWithProvider = (ui) =>
    render(<Provider store={unAuthStore}>{ui}</Provider>);

  it('should render Forgot Password Form component correctly', () => {
    const { container } = renderWithProvider(
      <Password
        {...props}
        location={forgotPasswordLocation}
        type="forgotPassword"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render Reset Password form component correctly', () => {
    const { container } = renderWithProvider(
      <Password
        {...props}
        location={resetPasswordLocation}
        type="resetPassword"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render success message when password is set successfully', () => {
    renderWithProvider(
      <Password
        {...props}
        location={resetPasswordLocation}
        passwordSetSuccess
        type="resetPassword"
      />
    );
    expect(
      screen.getByText(/Password Reset Successful. Please Sign In Below./i)
    ).toBeInTheDocument();
  });

  it('should render invalid token error when token is invalid', () => {
    renderWithProvider(
      <Password
        {...props}
        location={resetPasswordLocation}
        type="resetPassword"
        submitError="Password reset token is invalid or has expired"
      />
    );
    expect(
      screen.getByText(/Password reset token is invalid or has expired./i)
    ).toBeInTheDocument();
  });

  it('should render success message when reset token mail is sent successfully', () => {
    renderWithProvider(
      <Password
        {...props}
        location={resetPasswordLocation}
        mailSendSuccess
        type="forgotPassword"
      />
    );
    expect(
      screen.getByText(/A mail with a reset token has been sent to your mail./i)
    ).toBeInTheDocument();
  });

  it('should render Password component that is connected to the redux store correctly', () => {
    const { container } = render(
      <Provider store={unAuthStore}>
        <MemoryRouter>
          <WrappedPassword
            {...props}
            location={forgotPasswordLocation}
            type="forgotPassword"
          />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should redirect user to the homepage when the user is already authenticated', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WrappedPassword
            {...props}
            location={forgotPasswordLocation}
            type="forgotPassword"
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByRole('button', { name: /send me the link/i })).not.toBeInTheDocument();
  });
});
