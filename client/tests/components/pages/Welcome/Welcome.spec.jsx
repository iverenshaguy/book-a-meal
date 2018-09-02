import React from 'react';
import WelcomeComponent from '../../../../src/components/pages/Welcome';
import { caterer, customer } from '../../../setup/mockData';

const props = {
  user: caterer,
  isAuthenticated: false,
  authenticating: false
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
    const shallowWrapper = shallow(<WelcomeComponent {...props} authenticating />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('should render the Welcome component correctly when unauthenticated', () => {
    const shallowWrapper = shallow(<WelcomeComponent {...props} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Welcome')).toBeTruthy();
  });

  it('should render the Dashboard component correctly when authenticated and the user role is caterer', () => {
    const shallowWrapper = shallow(<WelcomeComponent {...props} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Dashboard')).toBeTruthy();
  });

  it('should render the CustomerMenu component correctly when authenticated and the user role is customer', () => {
    const shallowWrapper = shallow(<WelcomeComponent {...props} user={customer} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CustomerMenu')).toBeTruthy();
  });
});
