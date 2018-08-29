import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CustomerOrderDetailsComponent from '../../../../src/components/pages/OrderDetails/CustomerOrderDetails';
import CustomerOrderDetailsContainer from '../../../../src/containers/pages/OrderDetails/CustomerOrderDetails';
import { customer, customersOrdersObj, initialState } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
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
    const wrapper = shallow(<CustomerOrderDetailsComponent
      user={customer}
      fetchOrder={jest.fn()}
      editOrder={jest.fn()}
      cancelOrder={jest.fn()}
      push={jest.fn()}
      order={customersOrdersObj.orders[0]}
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa70c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Preloader when fetching', () => {
    const wrapper = shallow(<CustomerOrderDetailsComponent
      user={customer}
      fetchOrder={jest.fn()}
      editOrder={jest.fn()}
      cancelOrder={jest.fn()}
      push={jest.fn()}
      order={customersOrdersObj.orders[0]}
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa70c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and that order doesn\'t exist', () => {
    const comp = (
      <Provider store={store}>
        <CustomerOrderDetailsContainer
          user={customer}
          match={{ params: { id: 'fb097b-5959-45ff-8e21-51184fa61c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.text-center').text()).toEqual('This Order Does Not Exist');
  });

  it('renders delivered order', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[1] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CustomerOrderDetailsContainer
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetailsComponent);

    expect(wrapper.find('.order-status').text()).toEqual(' delivered');
  });

  it('renders canceled order', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CustomerOrderDetailsContainer
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa70c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetailsComponent);

    expect(wrapper.find('.danger').text()).toEqual(' canceled');
  });

  it('renders pending order', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[2] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CustomerOrderDetailsContainer
          user={customer}
          order={customersOrdersObj.orders[2]}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa80c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetailsComponent);
    expect(wrapper.find('.warning').text()).toEqual(' pending');
  });

  it('renders started order and shows control buttons', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[3] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CustomerOrderDetailsContainer
          user={customer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa90c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CustomerOrderDetailsComponent);
    expect(wrapper.find('.order-status').text()).toEqual(' pending');
    expect(wrapper.find('.d-flex-row.control-btns').length).toBeTruthy();
  });

  it('renders connected component', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[1] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CustomerOrderDetailsContainer
          user={customer}
          isFetching={false}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('calls edit order method on edit button click', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[3] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CustomerOrderDetailsContainer
          user={customer}
          isFetching={false}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa90c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    wrapper.find(CustomerOrderDetailsComponent).find('.control-btns>a').at(0).simulate('click');

    const storedOrder = JSON.parse(localStorage.getItem('bookamealorder'));

    expect(storedOrder.order.id).toEqual('fb097bde-5959-45ff-8e21-51184fa90c25');

    wrapper.unmount();
  });

  it('calls cancel order method on cancel button click', () => {
    const cancelOrderMock = jest.fn();
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: customersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CustomerOrderDetailsComponent
          user={customer}
          logout={jest.fn()}
          fetchOrder={jest.fn()}
          editOrder={jest.fn()}
          cancelOrder={cancelOrderMock}
          push={jest.fn()}
          isFetching={false}
          order={customersOrdersObj.orders[3]}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa90c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    wrapper.find(CustomerOrderDetailsComponent).find('.control-btns>a').at(1).simulate('click');

    expect(cancelOrderMock).toHaveBeenCalled();

    wrapper.unmount();
  });
});
