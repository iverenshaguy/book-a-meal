import React from 'react';
import { render, screen } from '@testing-library/react';
import Notification from 'src/features/common/components/Notification';

describe('Notification', () => {
  it('should render Notification component correctly', () => {
    const { container } = render(<Notification message="Hi, you rock" />);

    expect(screen.getByText('Hi, you rock')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
