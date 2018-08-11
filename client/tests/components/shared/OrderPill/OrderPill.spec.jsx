import React from 'react';
import OrderPill from '../../../../src/components/shared/OrderPill';
import { caterersOrdersObj, customersOrdersObj, caterer, customer } from '../../../setup/mockData';


describe('OrderPill', () => {
  it('renders Caterer Order correctly', () => {
    const wrapper = shallow(<OrderPill
      order={caterersOrdersObj.orders[0]}
      user={caterer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Customer Order correctly', () => {
    const wrapper = shallow(<OrderPill
      order={customersOrdersObj.orders[0]}
      user={customer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Customer Order correctly and adds ... for more than one meal', () => {
    const wrapper = shallow(<OrderPill
      order={customersOrdersObj.orders[1]}
      user={customer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p').text()).toEqual('1x Vegetable Sharwama and Guava Smoothie...');
  });

  it('renders Customer Order correctly when status started', () => {
    const wrapper = shallow(<OrderPill
      order={customersOrdersObj.orders[3]}
      user={customer}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('h4').text()).toEqual('Status: Pending');
  });
});
