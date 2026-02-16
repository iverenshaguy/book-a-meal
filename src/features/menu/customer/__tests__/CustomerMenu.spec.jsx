import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WrappedCustomerMenu, { CustomerMenu } from 'src/features/menu/customer/CustomerMenu';
import { customer, mealsObj, orderItems, initialState } from 'src/config/tests/fixtures';
import updateLocalStorageOrder from 'src/features/common/utils/updateLocalStorageOrder';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  menu: { ...initialState.menu, meals: mealsObj.meals },
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } },
});
const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

updateLocalStorageOrder('a09a5570-a3b2-4e21-94c3-5cf483dbd1ac', {
  id: null,
  meals: orderItems,
  deliveryPhoneNo: '2348167719888',
  deliveryAddress: 'A Place',
});

describe('CustomerMenu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + 60 * 60 * 13 * 1000);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render Customer Menu component correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <CustomerMenu user={customer} fetchMenu={jest.fn()} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(screen.getAllByText(/Jollof Rice/i).length).toBeGreaterThan(0);
  });

  it('should render Menu Component when connected to the redux store correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <WrappedCustomerMenu user={customer} {...mealsObj} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a message when shop is closed', () => {
    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(currentDay).getTime() + 60 * 60 * 18 * 1000);
    const { container } = render(
      <Provider store={store}>
        <CustomerMenu user={customer} fetchMenu={jest.fn()} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
    expect(
      screen.getByText(
        /Ordering is only available between 8:30am and 4:00pm. Please check back later./i
      )
    ).toBeInTheDocument();
    dateNowSpy.mockRestore();
  });

  it('should add an order to the basket when "Add to Basket" button is clicked', async () => {
    const user = userEvent.setup();
    localStorage.setItem(
      'bookamealorder',
      JSON.stringify({
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        order: { meals: [] },
        date: moment().format('YYYY-MM-DD'),
      })
    );
    render(
      <Provider store={store}>
        <CustomerMenu user={customer} fetchMenu={jest.fn()} />
      </Provider>
    );
    const addButtons = document.querySelectorAll('.meal-card-btn');
    if (addButtons.length > 1) {
      await user.click(addButtons[1]);
      const stored = JSON.parse(localStorage.getItem('bookamealorder'));
      expect(stored.order.meals.length).toBeGreaterThan(0);
    }
  });

  it('should update order item quantity when quantity input is changed', async () => {
    const user = userEvent.setup();
    updateLocalStorageOrder(customer.id, {
      id: null,
      meals: orderItems,
      deliveryPhoneNo: '2348167719888',
      deliveryAddress: 'A Place',
    });
    render(
      <Provider store={store}>
        <CustomerMenu user={customer} fetchMenu={jest.fn()} />
      </Provider>
    );
    const cartToggler = document.querySelector('#cart-toggler');
    await user.click(cartToggler);
    const quantityInputs = document.querySelectorAll('.order-input');
    expect(quantityInputs.length).toBeGreaterThanOrEqual(1);
    fireEvent.change(quantityInputs[0], { target: { value: '5' } });
    const stored = JSON.parse(localStorage.getItem('bookamealorder'));
    const firstStoredMeal = stored.order.meals.find((m) => m.id === orderItems[0].id);
    expect(firstStoredMeal.quantity).toBe(5);
  });

  it('should set quantity to 1 when quantity input is changed to zero or negative', async () => {
    const user = userEvent.setup();
    updateLocalStorageOrder(customer.id, {
      id: null,
      meals: orderItems,
      deliveryPhoneNo: '2348167719888',
      deliveryAddress: 'A Place',
    });
    render(
      <Provider store={store}>
        <CustomerMenu user={customer} fetchMenu={jest.fn()} />
      </Provider>
    );
    const cartToggler = document.querySelector('#cart-toggler');
    await user.click(cartToggler);
    const quantityInputs = document.querySelectorAll('.order-input');
    fireEvent.change(quantityInputs[0], { target: { value: '0' } });
    const stored = JSON.parse(localStorage.getItem('bookamealorder'));
    const firstStoredMeal = stored.order.meals.find((m) => m.id === orderItems[0].id);
    expect(firstStoredMeal.quantity).toBe(1);
  });

  it('should remove order item when remove is clicked', async () => {
    const user = userEvent.setup();
    updateLocalStorageOrder(customer.id, {
      id: null,
      meals: orderItems,
      deliveryPhoneNo: '2348167719888',
      deliveryAddress: 'A Place',
    });
    render(
      <Provider store={store}>
        <CustomerMenu user={customer} fetchMenu={jest.fn()} />
      </Provider>
    );
    const cartToggler = document.querySelector('#cart-toggler');
    await user.click(cartToggler);
    const removeButtons = document.querySelectorAll('.remove-order');
    expect(removeButtons.length).toBe(2);
    await user.click(removeButtons[0]);
    const stored = JSON.parse(localStorage.getItem('bookamealorder'));
    expect(stored.order.meals).toHaveLength(1);
    expect(stored.order.meals[0].id).toBe(orderItems[1].id);
  });
});
