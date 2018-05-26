import React from 'react';
import Welcome from '../../../../src/app/pages/Welcome/WelcomeComponent';

describe('Welcome', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Welcome />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
