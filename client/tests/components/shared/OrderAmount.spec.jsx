import React from 'react';
import OrderAmount from '../../../src/components/shared/OrderAmount';
import { caterersOrdersObj } from '../../setup/mockData';


describe('OrderAmount', () => {
  it('should render OrderAmount component correctly', () => {
    const shallowWrapper = shallow(<OrderAmount type="admin" meals={caterersOrdersObj.orders[0].meals} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
