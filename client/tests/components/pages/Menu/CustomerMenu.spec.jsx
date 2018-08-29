import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CustomerMenuComponent from '../../../../src/components/pages/Menu/CustomerMenu';
import CustomerMenuContainer from '../../../../src/containers/pages/Menu/CustomerMenu';
import { customer, mealsObj, orderItems, initialState } from '../../../setup/mockData';
import updateLocalStorageOrder from '../../../../src/helpers/updateLocalStorageOrder';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  menu: { ...initialState.menu, meals: mealsObj.meals },
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
});
const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

updateLocalStorageOrder('a09a5570-a3b2-4e21-94c3-5cf483dbd1ac', {
  id: null, meals: orderItems, deliveryPhoneNo: '2348167719888', deliveryAddress: 'A Place'
});

describe('CustomerMenu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const shallowWrapper = shallow(<CustomerMenuComponent
      user={customer}
      fetchMenu={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('renders Preloader when fetching', () => {
    const shallowWrapper = shallow(<CustomerMenuComponent
      user={customer}
      fetchMenu={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('calls fetchMenu when loadMoreMenu is called', () => {
    const fetchMenuMock = jest.fn();

    const comp = (
      <Provider store={store}>
        <CustomerMenuComponent
          user={customer}
          fetchMenu={fetchMenuMock}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    wrapper.find('Connect(MenuItems)').props().loadMoreMenu();

    expect(fetchMenuMock).toHaveBeenCalledTimes(2);
  });

  it('renders connected component', () => {
    const comp = (
      <Provider store={store}>
        <CustomerMenuContainer
          user={customer}
          {...mealsObj}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders message when shop is closed', () => {
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(currentDay).getTime() + (60 * 60 * 18 * 1000));
    const comp = (
      <Provider store={store}>
        <CustomerMenuComponent
          user={customer}
          fetchMenu={jest.fn()}
        />
      </Provider>);
    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.notif').text()).toEqual('Ordering is only available between 8:30am and 4:00pm. Please check back later.');
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  describe('Order Creation', () => {
    beforeAll(() => {
      Date.now = jest.fn(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));

      localStorage.setItem('bookamealorder', JSON.stringify({
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        order: {
          meals: [{
            id: '81211c24-51c0-46ec-b1e0-18db55880958',
            title: 'Jollof Rice, Beef and Plantain',
            price: '1500.00',
            quantity: 1
          }]
        },
        date: moment().format('YYYY-MM-DD')
      }));
    });

    afterAll(() => {
      Date.now = now;
    });

    it('adds an order when add to basket button is clicked', () => {
      const comp = (
        <Provider store={store}>
          <CustomerMenuComponent
            user={customer}
            fetchMenu={jest.fn()}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get());

      wrapper
        .find('.meal-card-btn')
        .at(1)
        .simulate('click');

      const localStorageMeal = JSON.parse(localStorage.getItem('bookamealorder'));

      expect(localStorageMeal.order.meals[1].title).toEqual('Vegetable Sharwama and Guava Smoothie');

      wrapper.unmount();
    });

    it('changes order quantity on input change', () => {
      const comp = (
        <Provider store={store}>
          <CustomerMenuComponent
            user={customer}
            fetchMenu={jest.fn()}
          />
        </Provider>);

      const wrapper = shallow(comp, rrcMock.get()).find(CustomerMenuComponent).dive();
      const changeOrderQuantitySpy = jest.spyOn(wrapper.instance(), 'changeOrderQuantity');

      wrapper.find('Cart').dive().find('input').at(0)
        .simulate('change', { target: { value: 3 } });

      expect(changeOrderQuantitySpy).toHaveBeenCalled();
      expect(wrapper.state().order.meals[0].quantity).toEqual(3);

      wrapper.unmount();
    });

    it('sets quantity input back to one if set to 0 or negative value', () => {
      const comp = (
        <Provider store={store}>
          <CustomerMenuComponent
            user={customer}
            fetchMenu={jest.fn()}
          />
        </Provider>);

      const wrapper = shallow(comp, rrcMock.get()).find(CustomerMenuComponent).dive();

      wrapper.find('Cart').dive().find('input').at(0)
        .simulate('change', { target: { value: 0 } });
      expect(wrapper.state().order.meals[0].quantity).toEqual(1);

      wrapper.find('Cart').dive().find('input').at(0)
        .simulate('change', { target: { value: -8 } });
      expect(wrapper.state().order.meals[0].quantity).toEqual(1);

      wrapper.unmount();
    });

    it('sets empty array as state order when local storage date is not today', () => {
      const comp = (
        <Provider store={store}>
          <CustomerMenuComponent
            user={customer}
            fetchMenu={jest.fn()}
          />
        </Provider>);

      localStorage.setItem('bookamealorder', JSON.stringify({
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        order: {
          meals: [{
            id: '81211c24-51c0-46ec-b1e0-18db55880958',
            title: 'Jollof Rice, Beef and Plantain',
            price: '1500.00',
            quantity: 1
          }]
        },
        date: '2017-06-20'
      }));

      const wrapper = shallow(comp, rrcMock.get()).find(CustomerMenuComponent).dive();

      expect(wrapper.state().order.meals.length).toEqual(0);

      wrapper.unmount();
    });

    it('removes orderItem when delete icon is clicked', () => {
      const comp = (
        <Provider store={store}>
          <CustomerMenuComponent
            user={customer}
            fetchMenu={jest.fn()}
          />
        </Provider>);

      localStorage.setItem('bookamealorder', JSON.stringify({
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        order: {
          meals: [{
            id: '81211c24-51c0-46ec-b1e0-18db55880958',
            title: 'Jollof Rice, Beef and Plantain',
            price: '1500.00',
            quantity: 1
          }]
        },
        date: moment().format('YYYY-MM-DD')
      }));

      const wrapper = shallow(comp, rrcMock.get()).find(CustomerMenuComponent).dive();

      wrapper.find('Cart').dive().find('Link.remove-order').dive()
        .find('button.remove-order')
        .simulate('click');

      expect(wrapper.state().order.meals.length).toEqual(0);

      wrapper.unmount();
    });
  });
});
