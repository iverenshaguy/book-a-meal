import React from 'react';
import SideNav from '../../../../src/app/shared/SideNav';
import { caterer } from '../../../setup/data';

describe('SideNav', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} logout={jest.fn()} active="dashboard" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when meals tab is active', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} logout={jest.fn()} active="meals" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when menu tab is active', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} logout={jest.fn()} active="menu" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly when orders tab is active', () => {
    const shallowWrapper = shallow(<SideNav user={caterer} logout={jest.fn()} active="orders" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
