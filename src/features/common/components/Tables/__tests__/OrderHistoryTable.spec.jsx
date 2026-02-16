import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderHistoryTable from 'src/features/common/components/Tables/OrderHistoryTable';
import { caterersOrdersObj } from 'src/config/tests/fixtures';

const { orders } = caterersOrdersObj;

describe('OrderHistoryTable', () => {
  it('should render OrderHistoryTable component correctly', () => {
    const { container } = render(<OrderHistoryTable orders={orders} deliverOrder={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it('should call deliverOrder when button is clicked', async () => {
    const user = userEvent.setup();
    const deliverOrderMock = jest.fn();
    render(<OrderHistoryTable orders={orders} deliverOrder={deliverOrderMock} />);

    const deliverButton = screen.getByRole('button', { name: /deliver/i });
    await user.click(deliverButton);

    expect(deliverOrderMock).toHaveBeenCalled();
  });
});
