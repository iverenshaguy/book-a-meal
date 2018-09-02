import React from 'react';
import CatererView from '../../../../src/components/shared/View';
import { caterer } from '../../../setup/mockData';

const props = {
  user: caterer,
  logout: jest.fn(),
  type: 'dashboard',
  isFetching: false,
  children: <p>Hi</p>,
  showTime: true
};
const { now } = Date;

describe('CatererView', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render CatererView component correctly', () => {
    const wrapper = shallow(<CatererView {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader').length).toBeFalsy();
  });

  it('should render Preloader when fetching page data', () => {
    const wrapper = shallow(<CatererView {...props} isFetching />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader').length).toEqual(1);
  });
});
