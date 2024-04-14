import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Redirect, MemoryRouter } from 'react-router-dom';
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

describe('HOC: AuthenticateRole', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const getAuthenticatedComponent = (roleToValidate = 'caterer') => {
    const dispatch = jest.fn();

    const props = {
      dispatch,
    };

    const MockComponent = () => <div>Hi</div>;
    MockComponent.displayName = 'MockComponent';

    const AuthenticatedComponent = (
      <AuthenticateRole roleToValidate={roleToValidate}>{() => <MockComponent />}</AuthenticateRole>
    );

    return {
      props,
      catererWrapper: mount(
        <Provider store={catererStore}>
          <MemoryRouter>{AuthenticatedComponent}</MemoryRouter>
        </Provider>
      ),
      customerWrapper: mount(
        <Provider store={customerStore}>
          <MemoryRouter>{AuthenticatedComponent}</MemoryRouter>
        </Provider>
      ),
      MockComponent,
    };
  };

  describe('Caterer Role', () => {
    it('should render passed in MockComponent when user role is caterer', () => {
      const { catererWrapper, MockComponent } = getAuthenticatedComponent();

      expect(catererWrapper.find(Redirect).length).toBeFalsy();
      expect(catererWrapper.find(MockComponent).length).toBeTruthy();
    });

    it('redirects to RootComponent when user role is customer', () => {
      const { customerWrapper, MockComponent } = getAuthenticatedComponent();

      expect(customerWrapper.find(Redirect).length).toBeTruthy();
      expect(customerWrapper.find(MockComponent).length).toBeFalsy();
    });
  });

  describe('Customer Role', () => {
    it('should render passed in MockComponent when user role is customer', () => {
      const { customerWrapper, MockComponent } = getAuthenticatedComponent('customer');

      expect(customerWrapper.find(Redirect).length).toBeFalsy();
      expect(customerWrapper.find(MockComponent).length).toBeTruthy();
    });

    it('redirects to RootComponent when user role is caterer', () => {
      const { catererWrapper, MockComponent } = getAuthenticatedComponent('customer');

      expect(catererWrapper.find(Redirect).length).toBeTruthy();
      expect(catererWrapper.find(MockComponent).length).toBeFalsy();
    });
  });
});
