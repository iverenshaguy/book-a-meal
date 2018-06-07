import React from 'react';
import OrderHistoryTable from '../../../../src/app/shared/Tables/OrderHistoryTable';
import { caterersOrdersObj } from '../../../setup/data';

const { orders } = caterersOrdersObj;

describe('OrderHistoryTable', () => {
  it('renders correctly', () => {
    const shallowWrapper = shallow(<OrderHistoryTable orders={orders} deliverOrder={jest.fn()} />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('calls deliverOrder', () => {
    const deliverOrderMock = jest.fn();
    const comp = <OrderHistoryTable orders={orders} deliverOrder={deliverOrderMock} />;
    const wrapper = mount(comp);

    wrapper.find('button.link-btn').simulate('click');

    expect(deliverOrderMock).toHaveBeenCalled();
  });
});
