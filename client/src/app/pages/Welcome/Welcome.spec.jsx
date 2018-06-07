import React from 'react';
import Welcome from './WelcomeComponent';

describe('Welcome', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Welcome />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
