import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import WrappedCustomerOrderDetails, {
  CustomerOrderDetails,
} from 'src/features/order-details/customer/CustomerOrderDetails';
import { customer, customersOrdersObj, initialState } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } },
});
const { now } = Date;

describe('CustomerOrderDetails', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render CustomerOrderDetails correctly when not fetching', () => {
    const { container } = render(
      <Provider store={store}>
        <CustomerOrderDetails
        user={customer}
        fetchOrder={jest.fn()}
        editOrder={jest.fn()}
        cancelOrder={jest.fn()}
        push={jest.fn()}
        order={customersOrdersObj.orders[0]}
        match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa70c25' } }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render a message when an order with that orderId doesn't exist", () => {
    const { container } = render(
      <Provider store={store}>
        <WrappedCustomerOrderDetails
          user={customer}
          match={{ params: { id: 'fb097b-5959-45ff-8e21-51184fa61c25' } }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('This Order Does Not Exist')).toBeInTheDocument();
  });

  it('should render an order that has been delivered correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[1] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } },
    });
    render(
      <Provider store={newStore}>
        <WrappedCustomerOrderDetails
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>
    );
    expect(screen.getAllByText(/delivered/i).length).toBeGreaterThan(0);
  });

  it('should render an order that has been canceled correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } },
    });
    render(
      <Provider store={newStore}>
        <WrappedCustomerOrderDetails
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa70c25' } }}
        />
      </Provider>
    );
    expect(screen.getByText(/canceled/i)).toBeInTheDocument();
  });
});
