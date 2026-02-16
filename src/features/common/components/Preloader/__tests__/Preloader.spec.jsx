import React from 'react';
import { render } from '@testing-library/react';
import Preloader, { MiniPreloader } from 'src/features/common/components/Preloader';

describe('Preloader', () => {
  it('should render Preloader component correctly', () => {
    const { container } = render(<Preloader />);

    expect(container).toMatchSnapshot();
  });

  it('should render MiniPreloader component correctly', () => {
    const { container } = render(<MiniPreloader />);

    expect(container).toMatchSnapshot();
  });
});
