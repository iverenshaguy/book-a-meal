import React from 'react';
import OrderPill from '../../../../src/components/shared/OrderPill';
import { caterersOrdersObj } from '../../../setup/data';


describe('OrderPill', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<OrderPill order={caterersOrdersObj.orders[0]} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
