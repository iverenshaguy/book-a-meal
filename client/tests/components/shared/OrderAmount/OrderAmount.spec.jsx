import React from 'react';
import OrderAmount from '../../../../src/components/shared/OrderAmount';
import { caterersOrdersObj } from '../../../setup/data';


describe('OrderAmount', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<OrderAmount type="admin" meals={caterersOrdersObj.orders[0].meals} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
