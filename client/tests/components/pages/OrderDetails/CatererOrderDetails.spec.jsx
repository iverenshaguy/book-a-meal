import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CatererOrderDetails from '../../../../src/components/pages/OrderDetails/CatererOrderDetails/CatererOrderDetails';
import ConnectedCatererOrderDetails from '../../../../src/components/pages/OrderDetails/CatererOrderDetails';
import { caterer, caterersOrdersObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialValues,
  orders: {
    ...initialValues.orders, items: caterersOrdersObj.orders
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
    const wrapper = shallow(<CatererOrderDetails
      user={caterer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      deliverOrder={jest.fn()}
      order={caterersOrdersObj.orders[0]}
      isFetching={false}
      delivering={false}
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('OrderPill')).toBeTruthy();
  });

  it('renders Preloader when fetching', () => {
    const wrapper = shallow(<CatererOrderDetails
      user={caterer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      deliverOrder={jest.fn()}
      order={caterersOrdersObj.orders[0]}
      isFetching
      delivering={false}
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader')).toBeTruthy();
  });

  it('renders MiniPreloader when delivering', () => {
    const wrapper = shallow(<CatererOrderDetails
      user={caterer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      deliverOrder={jest.fn()}
      order={caterersOrdersObj.orders[0]}
      isFetching={false}
      delivering
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('MiniPreloader')).toBeTruthy();
  });

  it('renders message when not fetching and that order doesn\'t exist', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCatererOrderDetails
          user={caterer}
          isFetching={false}
          match={{ params: { id: 'fb097bde-5959-45ff' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.text-center').text()).toEqual('This Order Does Not Exist');
  });

  it('renders delivered order', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCatererOrderDetails
          user={caterer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetails);

    expect(wrapper.find('.success').text()).toEqual('Delivered');
  });

  it('renders canceled order', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCatererOrderDetails
          user={caterer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c35' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetails);

    expect(wrapper.find('.danger').text()).toEqual('Canceled');
  });

  it('renders pending order and delivers pending order', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCatererOrderDetails
          user={caterer}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c26' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetails);

    wrapper.find('button.warning').simulate('click');

    expect(wrapper.find('button.warning').text()).toEqual('Deliver');
  });

  it('renders connected component', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCatererOrderDetails
          user={caterer}
          isFetching={false}
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
