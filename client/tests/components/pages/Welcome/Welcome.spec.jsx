import React from 'react';
import Welcome from '../../../../src/app/pages/Welcome/WelcomeComponent';
import { caterer } from '../../../setup/data';

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
});
