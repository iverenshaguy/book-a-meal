import React from 'react';
import InfiniteLoader from '../../../src/components/shared/InfiniteLoader';

describe('InfiniteLoader', () => {
  const items = Array.from({ length: 10 }, (v, i) => <p key={i}>Heya!</p>);
  it('should render InfiniteLoader component correctly', () => {
    const wrapper = mount(<InfiniteLoader
      items={items}
      loadMore={jest.fn()}
      metadata={{ pages: 1, totalItems: 20 }}
      height={10}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
