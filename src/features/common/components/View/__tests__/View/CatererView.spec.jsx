import React from 'react';
import { View as CatererView } from 'src/features/common/components/View';
import { caterer } from 'src/config/tests/fixtures';

const props = {
  user: caterer,
  logout: jest.fn(),
  type: 'dashboard',
  isFetching: false,
  children: <p>Hi</p>,
  showTime: true,
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
