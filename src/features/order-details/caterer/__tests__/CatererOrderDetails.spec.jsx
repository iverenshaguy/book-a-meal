import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import WrappedCatererOrderDetails, {
  CatererOrderDetails,
} from 'src/features/order-details/caterer/CatererOrderDetails';
import { caterer, caterersOrdersObj, initialState } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
});

const { now } = Date;

describe('CatererOrderDetails', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render correctly when not fetching', () => {
    const wrapper = shallow(
      <CatererOrderDetails
        fetchOrder={jest.fn()}
        deliverOrder={jest.fn()}
        order={caterersOrdersObj.orders[0]}
        delivering={false}
        match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('OrderPill')).toBeTruthy();
  });

  it('should render MiniPreloader when delivering an order', () => {
    const wrapper = shallow(
      <CatererOrderDetails
        fetchOrder={jest.fn()}
        deliverOrder={jest.fn()}
        order={caterersOrdersObj.orders[0]}
        delivering
        match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }}
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('MiniPreloader')).toBeTruthy();
  });

  it("should render message when an order doesn't exist", () => {
    const comp = (
      <Provider store={store}>
        <WrappedCatererOrderDetails order={null} match={{ params: { id: 'fb097bde-5959-45ff' } }} />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('p.text-center').text()).toEqual('This Order Does Not Exist');
  });

  it('should render a delivered order correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });

    const comp = (
      <Provider store={newStore}>
        <WrappedCatererOrderDetails match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }} />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetails);

    expect(wrapper.find('.success').text()).toEqual('Delivered');
  });

  it('should render a canceled order correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[3] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });

    const comp = (
      <Provider store={newStore}>
        <WrappedCatererOrderDetails match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c35' } }} />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetails);

    expect(wrapper.find('.danger').text()).toEqual('Canceled');
  });

  it('should render a pending order correctly and show a button to deliver the order', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[2] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });

    const comp = (
      <Provider store={newStore}>
        <WrappedCatererOrderDetails match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c26' } }} />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get()).find(CatererOrderDetails);

    wrapper.find('button.warning').simulate('click');

    expect(wrapper.find('button.warning').text()).toEqual('Deliver');
  });

  it('should render the connected OrderDetails component correctly', () => {
    const newStore = mockStore({
      ...initialState,
      singleOrder: { ...initialState.singleOrder, item: caterersOrdersObj.orders[0] },
      auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } },
    });

    const comp = (
      <Provider store={newStore}>
        <WrappedCatererOrderDetails match={{ params: { id: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }} />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
