import React from 'react';
import Notification from '../../../../src/components/shared/Notification';

describe('Notification', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<Notification message="Hi, you rock" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
