import React from 'react';
import CustomerView from '../../../../src/components/shared/View';
import { customer } from '../../../setup/mockData';

const props = {
  user: customer,
  logout: jest.fn(),
  type: 'menu',
  isFetching: false,
  children: <p>Hi</p>,
  showTime: true
};

describe('CustomerView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CustomerView {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader').length).toBeFalsy();
  });

  it('renders Preloader when fetching', () => {
    const wrapper = shallow(<CustomerView {...props} isFetching />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader').length).toEqual(1);
  });
});
