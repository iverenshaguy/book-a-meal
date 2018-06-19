import React from 'react';
import Welcome from '../../../../src/components/pages/Welcome/WelcomeComponent';
import { caterer, customer } from '../../../setup/data';

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
    const shallowWrapper = shallow(<Welcome {...props} authenticating />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders correctly when unauthenticated', () => {
    const shallowWrapper = shallow(<Welcome {...props} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Welcome')).toBeTruthy();
  });

  it('renders correctly when authenticated and user role is caterer', () => {
    const shallowWrapper = shallow(<Welcome {...props} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Dashboard')).toBeTruthy();
  });

  it('renders correctly when authenticated and user role is customer', () => {
    const shallowWrapper = shallow(<Welcome {...props} user={customer} isAuthenticated />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CustomerMenu')).toBeTruthy();
  });
});
