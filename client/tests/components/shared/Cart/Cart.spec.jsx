import React from 'react';
import moment from 'moment';
import Cart from '../../../../src/components/shared/Cart';
import { order } from '../../../setup/data';

const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

describe('Cart', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<Cart
      order={order}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders message when there is no order', () => {
    const shallowWrapper = shallow(<Cart
      order={[]}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('div.empty-cart>p').text()).toEqual('Your Cart is Empty');
  });

  it('toggles cart', () => {
    const wrapper = mount(<Cart
      order={order}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />, rrcMock.get());

    wrapper.find('#cart-toggler').simulate('click');

    expect(wrapper.state().show).toBeTruthy();
  });

  it('shows checkout button when shop is open', () => {
    const wrapper = mount(<Cart
      order={order}
      handleQuantityInputChange={jest.fn()}
      removeOrderItem={jest.fn()}
    />, rrcMock.get());

    expect(wrapper.find('.checkout-btn').length).toEqual(2); // 2 buttons for differet screen sizes
  });

  it('hides checkout button when shop is closed', () => {
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
