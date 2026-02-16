import React from 'react';
import { render } from '@testing-library/react';
import OrderSummary from 'src/features/common/components/OrderSummary';
import { caterersOrdersObj } from 'src/config/tests/fixtures';

describe('OrderSummary', () => {
  it('should render OrderSummary component correctly', () => {
    const { container } = render(<OrderSummary meals={caterersOrdersObj.orders[0].meals} status="delivered" />);

    expect(container).toMatchSnapshot();
  });
});
