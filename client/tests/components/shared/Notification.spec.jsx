import React from 'react';
import Notification from '../../../src/components/shared/Notification';

describe('Notification', () => {
  it('should render Notification component correctly', () => {
    const shallowWrapper = shallow(<Notification message="Hi, you rock" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
