import React from 'react';
import OrderDetails from '../../../../src/components/pages/OrderDetails';
import { caterer, customer } from '../../../setup/mockData';

const { now } = Date;

describe('OrderDetails', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date().setMilliseconds(0));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly: Caterer OrderDetails', () => {
    const shallowWrapper = shallow(<OrderDetails type="caterer" user={caterer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CatererOrderDetails')).toBeTruthy();
  });

  it('renders correctly: Customer OrderDetails', () => {
    const shallowWrapper = shallow(<OrderDetails type="customer" user={customer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CustomerOrderDetails')).toBeTruthy();
  });
});
