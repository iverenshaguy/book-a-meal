import React from 'react';
import { render } from '@testing-library/react';
import Footer from 'src/features/common/components/Footer';

describe('Footer', () => {
  it('should render the Footer component correctly', () => {
    const { container } = render(<Footer />);

    expect(container).toMatchSnapshot();
  });
});
