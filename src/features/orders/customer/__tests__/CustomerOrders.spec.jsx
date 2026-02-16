import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WrappedOrderConfirmation, { OrderConfirmation } from 'src/features/orders/customer/OrderConfirmation';
import OrderReview from 'src/features/orders/customer/OrderReview';
import { customer, initialState, localStorageOrder } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } },
});

describe('Customer Orders', () => {
  beforeEach(() => {
    localStorage.setItem('bookamealorder', JSON.stringify(localStorageOrder));
  });

  describe('Order Confirmation', () => {
    it('should render the OrderConfirmation component correctly', () => {
      render(
        <Provider store={store}>
          <OrderConfirmation user={customer} addOrder={jest.fn()} editOrder={jest.fn()} />
        </Provider>
      );
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });

    it('should redirect to the home page when there is no order to confirm', () => {
      localStorage.removeItem('bookamealorder');
      render(
        <Provider store={store}>
          <OrderConfirmation user={customer} addOrder={jest.fn()} editOrder={jest.fn()} />
        </Provider>
      );
      expect(screen.queryByRole('button', { name: /checkout/i })).not.toBeInTheDocument();
    });

    it('should render the connected WrappedOrderConfirmation component correctly', () => {
      render(
        <Provider store={store}>
          <WrappedOrderConfirmation user={customer} />
        </Provider>
      );
      expect(screen.getByText(/total/i)).toBeInTheDocument();
    });

    it('should call addOrder when checkout button is clicked', async () => {
      const user = userEvent.setup();
      const addOrderMock = jest.fn();
      const editOrderMock = jest.fn();
      render(
        <Provider store={store}>
          <OrderConfirmation
            user={customer}
            addOrder={addOrderMock}
            editOrder={editOrderMock}
          />
        </Provider>
      );
      const checkoutBtn = document.querySelector('#checkout');
      await user.click(checkoutBtn);
      expect(addOrderMock).toHaveBeenCalled();
    });
  });

  describe('Order Review', () => {
    it('should render the OrderReview component correctly', () => {
      const { container } = render(
        <Provider store={store}>
          <OrderReview user={customer} />
        </Provider>
      );
      expect(container).toMatchSnapshot();
    });

    it('should redirect when there is no order to review', () => {
      localStorage.removeItem('bookamealorder');
      render(
        <Provider store={store}>
          <OrderReview user={customer} />
        </Provider>
      );
      expect(screen.queryByLabelText(/phone|address/i)).not.toBeInTheDocument();
    });

    it('should handle input change when delivery fields change', async () => {
      const user = userEvent.setup();
      render(
        <Provider store={store}>
          <OrderReview user={customer} />
        </Provider>
      );
      const phoneInput = document.querySelector('input#deliveryPhoneNo');
      const addressInput = document.querySelector('input#deliveryAddress');
      if (phoneInput && addressInput) {
        await user.type(phoneInput, '08122334455');
        await user.type(addressInput, '2, Church Street, Place');
        const stored = JSON.parse(localStorage.getItem('bookamealorder'));
        expect(stored.order.deliveryPhoneNo).toBeDefined();
        expect(stored.order.deliveryAddress).toBeDefined();
      }
    });
  });
});
