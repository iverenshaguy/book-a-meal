import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CatererOrders from '../../../../src/components/pages/Orders/CatererOrders/CatererOrders';
import ConnectedCatererOrders from '../../../../src/components/pages/Orders/CatererOrders';
import { caterer, caterersOrdersObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ ...initialValues });

const { now } = Date;

describe('Orders', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const shallowWrapper = shallow(<CatererOrders
      user={caterer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      orders={caterersOrdersObj.orders}
      isFetching={false}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('OrderPill')).toBeTruthy();
  });
  it('renders Preloader when fetching', () => {
    const shallowWrapper = shallow(<CatererOrders
      user={caterer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      orders={caterersOrdersObj.orders}
      isFetching
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and there are no orders', () => {
    const shallowWrapper = shallow(<CatererOrders
      user={caterer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      orders={[]}
      isFetching
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('You Have No Orders');
  });

  it('renders connected component', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCatererOrders
          user={caterer}
          isFetching={false}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
