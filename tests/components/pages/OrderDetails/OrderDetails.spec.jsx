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

  it('should render the OrderDetails correctly when the type prop is caterer', () => {
    const shallowWrapper = shallow(<OrderDetails type="caterer" user={caterer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CatererOrderDetails')).toBeTruthy();
  });

  it('should render the OrderDetails correctly when the type prop is customer', () => {
    const shallowWrapper = shallow(<OrderDetails type="customer" user={customer} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('CustomerOrderDetails')).toBeTruthy();
  });
});
