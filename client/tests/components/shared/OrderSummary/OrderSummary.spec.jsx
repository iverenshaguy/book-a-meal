import React from 'react';
import OrderSummary from '../../../../src/components/shared/OrderSummary';
import { caterersOrdersObj } from '../../../setup/data';


describe('OrderSummary', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<OrderSummary meals={caterersOrdersObj.orders[0].meals} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
