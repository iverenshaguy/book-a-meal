import React from 'react';
import OrderPill from '../../../../src/components/shared/OrderPill';
import { caterersOrdersObj, customersOrdersObj, caterer, customer } from '../../../setup/mockData';


describe('OrderPill', () => {
  it('should render Caterer OrderPil correctly', () => {
    const wrapper = shallow(<OrderPill
      order={caterersOrdersObj.orders[0]}
      user={caterer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Customer OrderPill correctly', () => {
    const wrapper = shallow(<OrderPill
      order={customersOrdersObj.orders[0]}
      user={customer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Customer OrderOill correctly and add ... for more than one meal', () => {
    const wrapper = shallow(<OrderPill
      order={customersOrdersObj.orders[1]}
      user={customer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p').text()).toEqual('1x Vegetable Sharwama and Guava Smoothie...');
  });

  it('should render Customer OrderPill correctly when status started', () => {
    const wrapper = shallow(<OrderPill
      order={customersOrdersObj.orders[3]}
      user={customer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h4').text()).toEqual('Status: Pending');
  });
});
