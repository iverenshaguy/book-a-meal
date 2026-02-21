import React from 'react';
import { render } from '@testing-library/react';
import NotFound from 'src/features/not-found/NotFound';

describe('NotFound', () => {
  it('should render NotFound component correctly', () => {
    const { container } = render(<NotFound />);

    expect(container).toMatchSnapshot();
  });
});
