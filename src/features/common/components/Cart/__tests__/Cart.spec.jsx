import React from 'react';
import moment from 'moment';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from 'src/features/common/components/Cart/index';
import { order } from 'src/config/tests/fixtures';

const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

describe('Cart', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + 60 * 60 * 13 * 1000);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render the Cart component correctly', () => {
    const { container } = render(
      <Cart
        order={order}
        handleQuantityInputChange={jest.fn()}
        removeOrderItem={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render a message when there is no order', () => {
    const { container } = render(
      <Cart
        order={[]}
        handleQuantityInputChange={jest.fn()}
        removeOrderItem={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Your Basket is Empty')).toBeInTheDocument();
  });

  it('should toggle the cart when the cart toggler is clicked', async () => {
    const user = userEvent.setup();
    render(
      <Cart
        order={order}
        handleQuantityInputChange={jest.fn()}
        removeOrderItem={jest.fn()}
      />
    );
    const toggler = document.querySelector('#cart-toggler');
    await user.click(toggler);
    expect(document.querySelector('.order-summary')).toBeInTheDocument();
  });

  it('should show the checkout button when the shop is open', () => {
    render(
      <Cart
        order={order}
        handleQuantityInputChange={jest.fn()}
        removeOrderItem={jest.fn()}
      />
    );
    const checkoutBtns = document.querySelectorAll('.checkout-btn');
    expect(checkoutBtns.length).toBeGreaterThanOrEqual(1);
  });

  it('should hide the checkout button when the shop is closed', () => {
    const dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => new Date(currentDay).getTime() + 60 * 60 * 18 * 1000);
    const { container } = render(
      <Cart
        order={order}
        handleQuantityInputChange={jest.fn()}
        removeOrderItem={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
    expect(document.querySelectorAll('.checkout-btn').length).toEqual(0);
    dateNowSpy.mockRestore();
  });
});
