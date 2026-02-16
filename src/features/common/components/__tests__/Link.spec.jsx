import React from 'react';
import { render, screen } from '@testing-library/react';
import LinkComp from 'src/features/common/components/Link';

describe('Link', () => {
  it('should render Link component correctly', () => {
    const { container } = render(<LinkComp clickHandler={jest.fn()}>Click</LinkComp>);

    expect(screen.getByText('Click')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
