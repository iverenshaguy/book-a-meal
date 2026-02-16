import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WrappedCatererOrderDetails, {
  CatererOrderDetails,
} from 'src/features/order-details/caterer/CatererOrderDetails';
import { caterer, caterersOrdersObj, initialState } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
});
const { now } = Date;

describe('CatererOrderDetails', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render correctly when not fetching', () => {
    const { container } = render(
      <Provider store={store}>
        <CatererOrderDetails
          fetchOrder={jest.fn()}
          deliverOrder={jest.fn()}
          order={caterersOrdersObj.orders[0]}
          delivering={false}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText(/order #/i)).toBeInTheDocument();
  });

  it('should render MiniPreloader when delivering an order', () => {
    const { container } = render(
      <Provider store={store}>
        <CatererOrderDetails
          fetchOrder={jest.fn()}
          deliverOrder={jest.fn()}
          order={caterersOrdersObj.orders[0]}
          delivering
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it("should render message when an order doesn't exist", () => {
    const { container } = render(
      <Provider store={store}>
        <WrappedCatererOrderDetails
          order={null}
          match={{ params: { id: 'fb097bde-5959-45ff' } }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('This Order Does Not Exist')).toBeInTheDocument();
  });

  it('should render a delivered order correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });
    render(
      <Provider store={newStore}>
        <WrappedCatererOrderDetails
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>
    );
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  it('should render a canceled order correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[3] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });
    render(
      <Provider store={newStore}>
        <WrappedCatererOrderDetails
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c35' } }}
        />
      </Provider>
    );
    expect(screen.getByText('Canceled')).toBeInTheDocument();
  });

  it('should render a pending order correctly and show a button to deliver the order', async () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[2] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });
    const user = userEvent.setup();
    render(
      <Provider store={newStore}>
        <WrappedCatererOrderDetails
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c26' } }}
        />
      </Provider>
    );
    const deliverBtn = screen.getByRole('button', { name: /deliver/i });
    expect(deliverBtn).toBeInTheDocument();
    await user.click(deliverBtn);
  });

  it('should render the connected OrderDetails component correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });
    const { container } = render(
      <Provider store={newStore}>
        <WrappedCatererOrderDetails
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
