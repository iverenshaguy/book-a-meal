import React from 'react';
import { render } from '@testing-library/react';
import InfiniteLoader from 'src/features/common/components/InfiniteLoader';

describe('InfiniteLoader', () => {
  const items = Array.from({ length: 10 }, (v, i) => <p key={i}>Heya!</p>);

  it('should render InfiniteLoader component correctly', () => {
    const { container } = render(
      <InfiniteLoader items={items} loadMore={jest.fn()} metadata={{ pages: 1, totalItems: 20 }} height={10} />
    );

    expect(container).toMatchSnapshot();
  });
});
