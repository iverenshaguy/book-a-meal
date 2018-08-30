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

  it('should render CustomerOrderDetails correctly when not fetching', () => {
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

  it('should render a message when an order with that orderId doesn\'t exist', () => {
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

  it('should render an order that has been delivered correctly', () => {
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

  it('should render an order that has been canceled correctly', () => {
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

  it('should render an order that is pending correctly', () => {
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

  it('should render an order that has been started correctly and show the customer order control buttons', () => {
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

  it('should render a connected OrderDetails component correctly', () => {
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

  it('should call the edit order method when the "Edit Order" button is clicked', () => {
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

  it('should call the cancel order method when the "Cancel Order" button is clicked', () => {
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
