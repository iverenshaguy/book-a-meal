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

  it('renders correctly when authenticating', () => {
    const shallowWrapper = shallow(<WelcomeComponent {...props} authenticating />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders correctly when unauthenticated', () => {
    const shallowWrapper = shallow(<WelcomeComponent {...props} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Welcome')).toBeTruthy();
  });

  it('renders correctly when authenticated and user role is caterer', () => {
    const shallowWrapper = shallow(<WelcomeComponent {...props} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Dashboard')).toBeTruthy();
  });

  it('renders correctly when authenticated and user role is customer', () => {
    const shallowWrapper = shallow(<WelcomeComponent {...props} user={customer} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CustomerMenu')).toBeTruthy();
  });
});
