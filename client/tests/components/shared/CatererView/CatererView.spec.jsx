import React from 'react';
import CatererView from '../../../../src/app/shared/CatererView';
import { caterer } from '../../../setup/data';

const props = {
  user: caterer,
  logout: jest.fn(),
  type: 'dashboard',
  isFetching: false,
  children: <p>Hi</p>
};

describe('CatererView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CatererView {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('Preloader').length).toBeFalsy();
  });

  it('renders Preloader when fetching', () => {
    const wrapper = shallow(<CatererView {...props} isFetching />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader').length).toEqual(1);
    expect(wrapper.find('p').length).toBeFalsy();
  });
});
