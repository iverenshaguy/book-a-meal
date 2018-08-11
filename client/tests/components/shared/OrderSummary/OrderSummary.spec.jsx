import React from 'react';
import OrderSummary from '../../../../src/components/shared/OrderSummary';
import { caterersOrdersObj } from '../../../setup/mockData';


describe('OrderSummary', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<OrderSummary meals={caterersOrdersObj.orders[0].meals} status="delivered" />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
