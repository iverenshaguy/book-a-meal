import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CustomerMenu from '../../../../src/components/pages/Menu/CustomerMenu/CustomerMenu';
import ConnectedCustomerMenu from '../../../../src/components/pages/Menu/CustomerMenu';
import { customer, caterersMealsObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialValues, menu: { ...initialValues.menu, meals: caterersMealsObj.meals }
});
const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

describe('CustomerMenu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const shallowWrapper = shallow(<CustomerMenu
      user={customer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('renders Preloader when fetching', () => {
    const shallowWrapper = shallow(<CustomerMenu
      user={customer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and there are no meals on the menu', () => {
    const shallowWrapper = shallow(<CustomerMenu
      user={customer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      meals={[]}
      isFetching
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('There are no Meals on Today\'s Menu');
  });

  it('renders connected component', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerMenu
          user={customer}
          {...caterersMealsObj}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders message when shop is closed', () => {
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 18 * 1000));
    const wrapper = mount(<CustomerMenu
      user={customer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      isFetching={false}
      {...caterersMealsObj}
    />, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.notif').text()).toEqual('Ordering is not available between 4:00pm and 8:30am. Please check back later.');
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  describe('Order Creation', () => {
    beforeAll(() => {
      Date.now = jest.fn(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));

      localStorage.setItem('bookamealorder', JSON.stringify({
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        order: [{
          id: '81211c24-51c0-46ec-b1e0-18db55880958',
          title: 'Jollof Rice, Beef and Plantain',
          price: '1500.00',
          quantity: 1
        }],
        date: moment().format('YYYY-MM-DD')
      }));
    });

    afterAll(() => {
      Date.now = now;
    });

    it('adds an order', () => {
      const comp = (
        <CustomerMenu
          user={customer}
          logout={jest.fn()}
          fetchMenu={jest.fn()}
          isFetching={false}
          {...caterersMealsObj}
        />);


      const wrapper = mount(comp, rrcMock.get());
      const addOrderSpy = jest.spyOn(wrapper.instance(), 'addOrderItem');
      const handleOrderMealClickSpy = jest.spyOn(wrapper.instance(), 'handleOrderMealClick');

      wrapper.find('.meal-card-btn').at(1).simulate('click');

      expect(handleOrderMealClickSpy).toHaveBeenCalled();
      expect(addOrderSpy).toHaveBeenCalled();
      expect(wrapper.state().order[1].title).toEqual('Vegetable Sharwama and Guava Smoothie');
      expect(wrapper.state().order[1].quantity).toEqual(1);

      wrapper.unmount();
    });

    it('updates orderItem on reorder', () => {
      const comp = (
        <CustomerMenu
          user={customer}
          logout={jest.fn()}
          fetchMenu={jest.fn()}
          isFetching={false}
          {...caterersMealsObj}
        />);

      const wrapper = mount(comp, rrcMock.get());
      const updateOrderItemSpy = jest.spyOn(wrapper.instance(), 'updateOrderItem');
      const handleOrderMealClickSpy = jest.spyOn(wrapper.instance(), 'handleOrderMealClick');

      wrapper.find('.meal-card-btn').at(0).simulate('click');

      expect(updateOrderItemSpy).toHaveBeenCalled();
      expect(handleOrderMealClickSpy).toHaveBeenCalled();
      expect(wrapper.state().order[0].quantity).toEqual(2);

      wrapper.unmount();
    });

    it('changes order quantity on input change', () => {
      const comp = (
        <CustomerMenu
          user={customer}
          logout={jest.fn()}
          fetchMenu={jest.fn()}
          isFetching={false}
          {...caterersMealsObj}
        />);

      const wrapper = mount(comp, rrcMock.get());
      const changeOrderQuantitySpy = jest.spyOn(wrapper.instance(), 'changeOrderQuantity');

      wrapper.find('input').at(0).simulate('change', { target: { value: 3 } });

      expect(changeOrderQuantitySpy).toHaveBeenCalled();
      expect(wrapper.state().order[0].quantity).toEqual(3);

      wrapper.unmount();
    });

    it('sets quantity input back to one if set to 0 or negative value', () => {
      const comp = (
        <CustomerMenu
          user={customer}
          logout={jest.fn()}
          fetchMenu={jest.fn()}
          isFetching={false}
          {...caterersMealsObj}
        />);

      const wrapper = mount(comp, rrcMock.get());

      wrapper.find('input').at(0).simulate('change', { target: { value: 0 } });
      expect(wrapper.state().order[0].quantity).toEqual(1);

      wrapper.find('input').at(0).simulate('change', { target: { value: -8 } });
      expect(wrapper.state().order[0].quantity).toEqual(1);

      wrapper.unmount();
    });

    it('sets empty array as state order when local storage date is not today', () => {
      const comp = (
        <CustomerMenu
          user={customer}
          logout={jest.fn()}
          fetchMenu={jest.fn()}
          isFetching={false}
          {...caterersMealsObj}
        />);

      localStorage.setItem('bookamealorder', JSON.stringify({
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        order: [{
          id: '81211c24-51c0-46ec-b1e0-18db55880958',
          title: 'Jollof Rice, Beef and Plantain',
          price: '1500.00',
          quantity: 1
        }],
        date: '2017-06-20'
      }));

      const wrapper = mount(comp, rrcMock.get());

      expect(wrapper.state().order.length).toEqual(0);

      wrapper.unmount();
    });

    it('removes orderItem when delete icon is click', () => {
      const comp = (
        <CustomerMenu
          user={customer}
          logout={jest.fn()}
          fetchMenu={jest.fn()}
          isFetching={false}
          {...caterersMealsObj}
        />);

      localStorage.setItem('bookamealorder', JSON.stringify({
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        order: [{
          id: '81211c24-51c0-46ec-b1e0-18db55880958',
          title: 'Jollof Rice, Beef and Plantain',
          price: '1500.00',
          quantity: 1
        }],
        date: moment().format('YYYY-MM-DD')
      }));

      const wrapper = mount(comp, rrcMock.get());

      wrapper.find('button.remove-order').simulate('click');

      expect(wrapper.state().order.length).toEqual(0);

      wrapper.unmount();
    });
  });
});
