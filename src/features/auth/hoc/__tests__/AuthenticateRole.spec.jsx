import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import AuthenticateRole from 'src/features/auth/hoc/AuthenticateRole';
import rootReducer from 'src/store/rootReducer';
import { initialState, customer, caterer } from 'src/config/tests/fixtures';

const catererInitialValues = {
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
};

const customerInitialValues = {
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } },
};

const catererStore = createStore(rootReducer, catererInitialValues, applyMiddleware(thunk));
const customerStore = createStore(rootReducer, customerInitialValues, applyMiddleware(thunk));

const MockComponent = () => <div>Hi</div>;
MockComponent.displayName = 'MockComponent';

const renderWithRole = (store, roleToValidate = 'caterer') => {
  const AuthenticatedComponent = (
    <AuthenticateRole roleToValidate={roleToValidate}>{() => <MockComponent />}</AuthenticateRole>
  );
  return render(
    <Provider store={store}>
      <MemoryRouter>{AuthenticatedComponent}</MemoryRouter>
    </Provider>
  );
};

describe('HOC: AuthenticateRole', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Caterer Role', () => {
    it('should render passed in MockComponent when user role is caterer', () => {
      renderWithRole(catererStore, 'caterer');

      expect(screen.getByText('Hi')).toBeInTheDocument();
    });

    it('redirects to RootComponent when user role is customer', () => {
      renderWithRole(customerStore, 'caterer');

      expect(screen.queryByText('Hi')).not.toBeInTheDocument();
    });
  });

  describe('Customer Role', () => {
    it('should render passed in MockComponent when user role is customer', () => {
      renderWithRole(customerStore, 'customer');

      expect(screen.getByText('Hi')).toBeInTheDocument();
    });

    it('redirects to RootComponent when user role is caterer', () => {
      renderWithRole(catererStore, 'customer');

      expect(screen.queryByText('Hi')).not.toBeInTheDocument();
    });
  });
});
