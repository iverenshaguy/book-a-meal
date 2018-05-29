import React from 'react';
import SideNav from '../../../../src/app/shared/SideNav';
import { caterer } from '../../../setup/data';

describe('SideNav', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} logout={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
