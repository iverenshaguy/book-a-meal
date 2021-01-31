import React from 'react';
import OrderHistoryTable from '../../../../src/components/shared/Tables/OrderHistoryTable';
import { caterersOrdersObj } from '../../../setup/mockData';

const { orders } = caterersOrdersObj;

describe('OrderHistoryTable', () => {
  it('should render OrderHistoryTable component correctly', () => {
    const shallowWrapper = shallow(<OrderHistoryTable orders={orders} deliverOrder={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should call deliverOrder', () => {
    const deliverOrderMock = jest.fn();
    const comp = <OrderHistoryTable orders={orders} deliverOrder={deliverOrderMock} />;
    const wrapper = mount(comp);

    wrapper.find('button.link-btn').simulate('click');

    expect(deliverOrderMock).toHaveBeenCalled();
  });
});
