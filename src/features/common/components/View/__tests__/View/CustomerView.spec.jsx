import React from 'react';
import { View as CustomerView } from 'src/features/common/components/View';
import { customer } from 'src/config/tests/fixtures';

const props = {
  user: customer,
  logout: jest.fn(),
  type: 'menu',
  isFetching: false,
  children: <p>Hi</p>,
  showTime: true,
};

describe('CustomerView', () => {
  it('should render CustomerView component correctly', () => {
    const wrapper = shallow(<CustomerView {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader').length).toBeFalsy();
  });

  it('should render Preloader when fetching page data', () => {
    const wrapper = shallow(<CustomerView {...props} isFetching />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader').length).toEqual(1);
  });
});
