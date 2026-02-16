import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import AuthenticateUser from 'src/features/auth/hoc/AuthenticateUser';
import rootReducer from 'src/store/rootReducer';
import { initialState } from 'src/config/tests/fixtures';

const loadingInitialValues = {
  ...initialState,
  auth: { ...initialState.auth, loading: true },
};

const authStore = createStore(rootReducer, initialState, applyMiddleware(thunk));
const loadingStore = createStore(rootReducer, loadingInitialValues, applyMiddleware(thunk));
const unAuthStore = createStore(rootReducer, undefined, applyMiddleware(thunk));

const MockComponent = () => <div>Hi</div>;
MockComponent.displayName = 'MockComponent';

const location = {
  pathname: '/login',
  state: { from: { pathname: '/' } },
};

const renderHOC = (store) => {
  const HOCComponent = (
    <AuthenticateUser location={location}>{(parentProps) => <MockComponent {...parentProps} />}</AuthenticateUser>
  );
  return render(
    <Provider store={store}>
      <MemoryRouter>{HOCComponent}</MemoryRouter>
    </Provider>
  );
};

describe('HOC: AuthenticateUser', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = renderHOC(unAuthStore);

    expect(container).toMatchSnapshot();
  });

  it('should render unauthorized component: Redirect', () => {
    renderHOC(unAuthStore);

    expect(screen.queryByText('Hi')).not.toBeInTheDocument();
  });

  it('should render authorized component: MockComponent', () => {
    renderHOC(authStore);

    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  it('should render loading component: Loading', () => {
    renderHOC(loadingStore);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Hi')).not.toBeInTheDocument();
  });
});
