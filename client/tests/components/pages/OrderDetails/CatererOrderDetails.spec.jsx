import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CatererOrderDetailsComponent from '../../../../src/components/pages/OrderDetails/CatererOrderDetails';
import CatererOrderDetailsContainer from '../../../../src/containers/pages/OrderDetails/CatererOrderDetails';
import { caterer, caterersOrdersObj, initialState } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
});

const { now } = Date;

describe('CatererOrderDetails', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const wrapper = shallow(<CatererOrderDetailsComponent
      fetchOrder={jest.fn()}
      deliverOrder={jest.fn()}
      order={caterersOrdersObj.orders[0]}
      delivering={false}
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('OrderPill')).toBeTruthy();
  });

  it('renders Preloader when fetching', () => {
    const wrapper = shallow(<CatererOrderDetailsComponent
      fetchOrder={jest.fn()}
      deliverOrder={jest.fn()}
      order={caterersOrdersObj.orders[0]}
      delivering={false}
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('Preloader')).toBeTruthy();
  });

  it('renders MiniPreloader when delivering', () => {
    const wrapper = shallow(<CatererOrderDetailsComponent
      fetchOrder={jest.fn()}
      deliverOrder={jest.fn()}
      order={caterersOrdersObj.orders[0]}
      delivering
      match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
    />);

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('MiniPreloader')).toBeTruthy();
  });

  it('renders message when not fetching and that order doesn\'t exist', () => {
    const comp = (
      <Provider store={store}>
        <CatererOrderDetailsContainer
          order={null}
          match={{ params: { id: 'fb097bde-5959-45ff' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.text-center').text()).toEqual('This Order Does Not Exist');
  });

  it('renders delivered order', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CatererOrderDetailsContainer
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetailsComponent);

    expect(wrapper.find('.success').text()).toEqual('Delivered');
  });

  it('renders canceled order', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[3] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CatererOrderDetailsContainer
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c35' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetailsComponent);

    expect(wrapper.find('.danger').text()).toEqual('Canceled');
  });

  it('renders pending order and delivers pending order', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[2] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CatererOrderDetailsContainer
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c26' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetailsComponent);

    wrapper.find('button.warning').simulate('click');

    expect(wrapper.find('button.warning').text()).toEqual('Deliver');
  });

  it('renders connected component', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
    });

    const comp = (
      <Provider store={newStore}>
        <CatererOrderDetailsContainer
          match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
