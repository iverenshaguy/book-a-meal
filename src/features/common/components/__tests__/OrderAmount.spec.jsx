import React from 'react';
import { render } from '@testing-library/react';
import OrderAmount from 'src/features/common/components/OrderAmount';
import { caterersOrdersObj } from 'src/config/tests/fixtures';

describe('OrderAmount', () => {
  it('should render OrderAmount component correctly', () => {
    const { container } = render(<OrderAmount type="admin" meals={caterersOrdersObj.orders[0].meals} />);

    expect(container).toMatchSnapshot();
  });
});
