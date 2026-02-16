import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderPill from 'src/features/common/components/OrderPill';
import { caterersOrdersObj, customersOrdersObj, caterer, customer } from 'src/config/tests/fixtures';

describe('OrderPill', () => {
  it('should render Caterer OrderPil correctly', () => {
    const { container } = render(<OrderPill order={caterersOrdersObj.orders[0]} user={caterer} />);

    expect(container).toMatchSnapshot();
  });

  it('should render Customer OrderPill correctly', () => {
    const { container } = render(<OrderPill order={customersOrdersObj.orders[0]} user={customer} />);

    expect(container).toMatchSnapshot();
  });

  it('should render Customer OrderOill correctly and add ... for more than one meal', () => {
    const { container } = render(<OrderPill order={customersOrdersObj.orders[1]} user={customer} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText(/1x Vegetable Sharwama and Guava Smoothie\.\.\./)).toBeInTheDocument();
  });

  it('should render Customer OrderPill correctly when status started', () => {
    render(<OrderPill order={customersOrdersObj.orders[3]} user={customer} />);

    expect(screen.getByText(/Pending/)).toBeInTheDocument();
  });
});
