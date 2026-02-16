import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import WrappedAuth, { Auth } from 'src/features/auth';
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
};

const signinLocation = {
  pathname: '/signin',
  state: { from: { pathname: '/' } },
};

const catererSignupLocation = {
  pathname: '/signup',
  state: { from: { pathname: '/' } },
  search: '?role=caterer',
};

const customerSignupLocation = {
  pathname: '/signup',
  state: { from: { pathname: '/' } },
  search: '?role=customer',
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

  const renderWithProvider = (ui) =>
    render(<Provider store={unAuthStore}>{ui}</Provider>);

  it('should render Signin Form component correctly', () => {
    const { container } = renderWithProvider(
      <Auth {...props} location={signinLocation} type="signin" />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render customer's signup form component correctly", () => {
    const { container } = renderWithProvider(
      <Auth {...props} location={customerSignupLocation} type="signup" />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render signin component that is connected to the redux store correctly', () => {
    const { container } = render(
      <Provider store={unAuthStore}>
        <MemoryRouter>
          <WrappedAuth {...props} location={signinLocation} type="signin" />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should set the form component state to signin when the type prop equals signin', () => {
    renderWithProvider(
      <Auth {...props} location={customerSignupLocation} type="signin" />
    );
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('should set the form component state to customerSignup when the type prop equals customerSignup', () => {
    renderWithProvider(
      <Auth {...props} location={customerSignupLocation} type="signup" />
    );
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  });

  it('should set the form component state to catererSignup when the type prop equals catererSignup', () => {
    renderWithProvider(
      <Auth {...props} location={catererSignupLocation} type="signup" />
    );
    expect(screen.getByLabelText(/business name/i)).toBeInTheDocument();
  });

  it("should render caterer's signup form correctly when role query is caterer", () => {
    const { container } = renderWithProvider(
      <Auth {...props} location={catererSignupLocation} type="signup" />
    );
    expect(container).toMatchSnapshot();
  });

  it('should redirect user to the homepage when the user is already authenticated', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WrappedAuth
            {...props}
            location={catererSignupLocation}
            type="catererSignup"
          />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByLabelText(/business name/i)).not.toBeInTheDocument();
  });
});
