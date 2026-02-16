import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import OrderDetails from 'src/features/order-details';
import { caterer, customer, initialState, caterersOrdersObj, customersOrdersObj } from 'src/config/tests/fixtures';

const mockStore = configureStore([thunk]);
const catererStore = mockStore({
  ...initialState,
  singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[0] },
});
const customerStore = mockStore({
  ...initialState,
  singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[0] },
});
const { now } = Date;

describe('OrderDetails', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date().setMilliseconds(0));
  });

  afterAll(() => {
    Date.now = now;
  });

  const match = { params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } };

  it('should render the OrderDetails correctly when the type prop is caterer', () => {
    const { container } = render(
      <Provider store={catererStore}>
        <OrderDetails type="caterer" user={caterer} match={match} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render the OrderDetails correctly when the type prop is customer', () => {
    const { container } = render(
      <Provider store={customerStore}>
        <OrderDetails type="customer" user={customer} match={match} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
