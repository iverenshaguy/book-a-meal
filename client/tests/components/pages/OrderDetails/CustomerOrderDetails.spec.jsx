import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CustomerOrderDetails from '../../../../src/components/pages/OrderDetails/CustomerOrderDetails/CustomerOrderDetails';
import ConnectedCustomerOrderDetails from '../../../../src/components/pages/OrderDetails/CustomerOrderDetails';
import { customer, customersOrdersObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialValues,
  orders: {
    ...initialValues.orders, items: customersOrdersObj.orders
  }
});

const { now } = Date;

describe('OrderDetails', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const wrapper = shallow(<CustomerOrderDetails
      user={customer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      order={customersOrdersObj.orders[0]}
      isFetching={false}
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Preloader when fetching', () => {
    const wrapper = shallow(<CustomerOrderDetails
      user={customer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      order={customersOrdersObj.orders[0]}
      isFetching
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and that order doesn\'t exist', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerOrderDetails
          user={customer}
          isFetching={false}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa61c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.text-center').text()).toEqual('This Order Does Not Exist');
  });

  it('renders delivered order', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerOrderDetails
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetails);

    expect(wrapper.find('.success').text()).toEqual(' delivered');
  });

  it('renders canceled order', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerOrderDetails
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa70c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetails);

    expect(wrapper.find('.danger').text()).toEqual(' canceled');
  });

  it('renders pending order', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerOrderDetails
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa80c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetails);
    expect(wrapper.find('.warning').text()).toEqual(' pending');
  });

  it('renders started order and shows control buttons', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerOrderDetails
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa90c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetails);
    expect(wrapper.find('.warning').text()).toEqual(' pending');
    expect(wrapper.find('.d-flex-row.control-btns').length).toBeTruthy();
  });

  it('renders connected component', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerOrderDetails
          user={customer}
          isFetching={false}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
