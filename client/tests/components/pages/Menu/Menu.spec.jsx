import React from 'react';
import Menu from '../../../../src/components/pages/Menu';
import { caterer, customer } from '../../../setup/data';

const { now } = Date;

describe('Menu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date().setMilliseconds(0));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly: Caterer Menu', () => {
    const shallowWrapper = shallow(<Menu type="caterer" user={caterer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders correctly: Customer Menu', () => {
    const shallowWrapper = shallow(<Menu type="customer" user={customer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
