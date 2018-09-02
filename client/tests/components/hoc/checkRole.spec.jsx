import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Redirect, MemoryRouter } from 'react-router-dom';
import checkRole from '../../../src/containers/hoc/checkRole';
import rootReducer from '../../../src/reducers/rootReducer';
import { initialState, customer, caterer } from '../../setup/mockData';

const catererInitialValues = {
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
};

const customerInitialValues = {
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
};

const catererStore = createStore(rootReducer, catererInitialValues, applyMiddleware(thunk));
const customerStore = createStore(rootReducer, customerInitialValues, applyMiddleware(thunk));

describe('HOC: checkRole', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('Caterer Role', () => {
    const setup = () => {
      const dispatch = jest.fn();

      const props = {
        dispatch
      };

      const MockComponent = () => (<div>Hi</div>);
      MockComponent.displayName = 'MockComponent';

      const CheckCatererRole = checkRole('caterer')(MockComponent);

      const catererComponent = (
        <Provider store={catererStore}>
          <MemoryRouter>
            <CheckCatererRole />
          </MemoryRouter>
        </Provider>
      );

      const catererWrapper = mount(catererComponent);

      const customerComponent = (
        <Provider store={customerStore}>
          <MemoryRouter>
            <CheckCatererRole />
          </MemoryRouter>
        </Provider>
      );

      const customerWrapper = mount(customerComponent);

      return {
        props, catererWrapper, customerWrapper, MockComponent
      };
    };

    it('should render passed in MockComponent when user role is caterer', () => {
      const { catererWrapper, MockComponent } = setup();

      expect(catererWrapper.find(Redirect).length).toBeFalsy();
      expect(catererWrapper.find(MockComponent).length).toBeTruthy();
    });

    it('redirects to RootComponent when user role is customer', () => {
      const { customerWrapper, MockComponent } = setup();

      expect(customerWrapper.find(Redirect).length).toBeTruthy();
      expect(customerWrapper.find(MockComponent).length).toBeFalsy();
    });
  });

  describe('Customer Role', () => {
    const setup = () => {
      const dispatch = jest.fn();

      const props = {
        dispatch
      };

      const MockComponent = () => (<div>Hi</div>);
      MockComponent.displayName = 'MockComponent';

      const CheckCustomerRole = checkRole('customer')(MockComponent);

      const catererComponent = (
        <Provider store={catererStore}>
          <MemoryRouter>
            <CheckCustomerRole />
          </MemoryRouter>
        </Provider>
      );

      const catererWrapper = mount(catererComponent);

      const customerComponent = (
        <Provider store={customerStore}>
          <MemoryRouter>
            <CheckCustomerRole />
          </MemoryRouter>
        </Provider>
      );

      const customerWrapper = mount(customerComponent);

      return {
        props, catererWrapper, customerWrapper, MockComponent
      };
    };

    it('should render passed in MockComponent when user role is customer', () => {
      const { customerWrapper, MockComponent } = setup();

      expect(customerWrapper.find(Redirect).length).toBeFalsy();
      expect(customerWrapper.find(MockComponent).length).toBeTruthy();
    });

    it('redirects to RootComponent when user role is caterer', () => {
      const { catererWrapper, MockComponent } = setup();

      expect(catererWrapper.find(Redirect).length).toBeTruthy();
      expect(catererWrapper.find(MockComponent).length).toBeFalsy();
    });
  });
});
