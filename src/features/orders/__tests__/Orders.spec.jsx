import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import WrappedOrders, { Orders } from 'src/features/orders/Orders';
import {
  caterer,
  caterersOrdersObj,
  customer,
  customersOrdersObj,
  initialState,
  metadata,
} from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ ...initialState });
const { now } = Date;

describe('Orders', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  describe('Caterer Orders', () => {
    it('should render Caterer Orders component correctly', () => {
      const { container } = render(
        <Provider store={store}>
          <Orders
            user={caterer}
            fetchOrders={jest.fn()}
            orders={caterersOrdersObj.orders}
            metadata={metadata}
          />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('should render a message when there are no orders to show', () => {
      const { container } = render(
        <Provider store={store}>
          <Orders user={caterer} fetchOrders={jest.fn()} orders={[]} metadata={metadata} />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('should render the connected Caterer Orders component correctly', () => {
      const { container } = render(
        <Provider store={store}>
          <WrappedOrders user={caterer} />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('Customer Orders', () => {
    it('should render Customer Orders component correctly', () => {
      const { container } = render(
        <Provider store={store}>
          <Orders
            user={customer}
            fetchOrders={jest.fn()}
            orders={customersOrdersObj.orders}
            metadata={metadata}
          />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('should render a message when there are no orders to show', () => {
      const { container } = render(
        <Provider store={store}>
          <Orders user={customer} fetchOrders={jest.fn()} orders={[]} metadata={{}} />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('should render the connected Customer Orders component correctly', () => {
      const { container } = render(
        <Provider store={store}>
          <WrappedOrders user={customer} />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
