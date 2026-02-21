import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import WrappedDashboard, { Dashboard } from 'src/features/dashboard/Dashboard';
import { caterer, caterersOrdersObj, initialState } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
});
const { now } = Date;

describe('Dashboard', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render Dashboard component correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <Dashboard
          fetchOrders={jest.fn()}
          deliverOrder={jest.fn()}
          {...caterersOrdersObj}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render connected Dashboard component correctly', () => {
    const dispatchMock = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <WrappedDashboard dispatch={dispatchMock} {...caterersOrdersObj} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
