import React from 'react';
import Menu from '../../../../src/components/pages/Menu';
import { caterer, customer } from '../../../setup/mockData';

const { now } = Date;

describe('Menu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date().setMilliseconds(0));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render Caterer Menu component correctly when type prop is caterer', () => {
    const shallowWrapper = shallow(<Menu type="caterer" user={caterer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CatererMenu')).toBeTruthy();
  });

  it('should render Customer Menu component correctly when type prop is customer', () => {
    const shallowWrapper = shallow(<Menu type="customer" user={customer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CustomerMenu')).toBeTruthy();
  });
});
