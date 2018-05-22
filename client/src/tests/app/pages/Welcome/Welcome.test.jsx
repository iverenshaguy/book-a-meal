import React from 'react';
import { WelcomeComponent as Welcome } from '../../../../app/pages/Welcome';

describe('Welcome', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Welcome />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
