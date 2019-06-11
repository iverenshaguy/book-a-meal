import React from 'react';
import moment from 'moment';
import Cart from '../../../src/components/shared/Cart';
import { order } from '../../setup/mockData';

const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

describe('Cart', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render the Cart component correctly', () => {
    const shallowWrapper = shallow(<Cart
      order={order}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('should render a message when there is no order', () => {
    const shallowWrapper = shallow(<Cart
      order={[]}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('div.empty-cart>p').text()).toEqual('Your Basket is Empty');
  });

  it('should toggle the cart when the cart toggler is clicked', () => {
    const wrapper = mount(<Cart
      order={order}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />, rrcMock.get());

    wrapper.find('#cart-toggler').simulate('click');

    expect(wrapper.state().show).toBeTruthy();
  });

  it('should show the checkout button when the shop is open', () => {
    const wrapper = mount(<Cart
      order={order}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />, rrcMock.get());

    expect(wrapper.find('.checkout-btn').length).toEqual(2); // 2 buttons for differet screen sizes
  });

  it('should hide the checkout button whenthe shop is closed', () => {
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 18 * 1000));
    const wrapper = mount(<Cart
      order={order}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.checkout-btn').length).toEqual(0);

    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });
});
