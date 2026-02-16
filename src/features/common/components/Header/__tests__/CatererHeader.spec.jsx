import React from 'react';
import { render } from '@testing-library/react';
import { CatererHeader } from 'src/features/common/components/Header/CatererHeader';

const { now } = Date;

describe('CatererHeader', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render CatererHeader component correctly', () => {
    const { container } = render(<CatererHeader currentDay="1970-01-01" toggleSideNav={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });
});
