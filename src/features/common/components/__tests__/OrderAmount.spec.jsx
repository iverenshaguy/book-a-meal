import React from 'react';
import OrderAmount from 'src/features/common/components/OrderAmount';
import { caterersOrdersObj } from 'src/config/tests/fixtures';

describe('OrderAmount', () => {
  it('should render OrderAmount component correctly', () => {
    const shallowWrapper = shallow(<OrderAmount type="admin" meals={caterersOrdersObj.orders[0].meals} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });
});
