import React from 'react';
import { Welcome } from 'src/features/welcome';
import { caterer, customer } from 'src/config/tests/fixtures';

const props = {
  user: caterer,
  isAuthenticated: false,
  authenticating: false,
};
const { now } = Date;

describe('Welcome', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render the Preloader component when authenticating', () => {
    const shallowWrapper = shallow(<Welcome {...props} authenticating />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('should render the Welcome component correctly when unauthenticated', () => {
    const shallowWrapper = shallow(<Welcome {...props} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Welcome')).toBeTruthy();
  });

  it('should render the Dashboard component correctly when authenticated and the user role is caterer', () => {
    const shallowWrapper = shallow(<Welcome {...props} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Dashboard')).toBeTruthy();
  });

  it('should render the CustomerMenu component correctly when authenticated and the user role is customer', () => {
    const shallowWrapper = shallow(<Welcome {...props} user={customer} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CustomerMenu')).toBeTruthy();
  });
});
