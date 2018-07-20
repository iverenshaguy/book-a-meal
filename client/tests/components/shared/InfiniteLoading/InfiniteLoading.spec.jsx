import React from 'react';
import InfiniteLoading from '../../../../src/components/shared/InfiniteLoading';

describe('InfiniteLoading', () => {
  const items = Array.from({ length: 10 }, (v, i) => <p key={i}>Heya!</p>);
  it('renders correctly', () => {
    const wrapper = mount(<InfiniteLoading items={items} limit={3} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('updates current page when there are more elements to load', () => {
    const wrapper = mount(<InfiniteLoading items={items} limit={3} />);

    expect(wrapper.state().currentPage).toEqual(1);

    wrapper.instance().loadMore();

    expect(wrapper.state().currentPage).toEqual(2);
  });

  it('does not update current page when there are no more elements to load', () => {
    const wrapper = mount(<InfiniteLoading items={items} limit={10} />);

    expect(wrapper.state().currentPage).toEqual(1);

    wrapper.instance().loadMore();

    expect(wrapper.state().currentPage).toEqual(1);
    expect(wrapper.state().hasMore).toEqual(false);
  });
});
