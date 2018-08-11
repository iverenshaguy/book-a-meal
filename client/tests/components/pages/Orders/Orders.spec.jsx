import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Orders from '../../../../src/components/pages/Orders/Orders';
import ConnectedOrders from '../../../../src/components/pages/Orders';
import { caterer, caterersOrdersObj, customer, customersOrdersObj, initialValues, metadata } from '../../../setup/mockData';

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

  describe('Caterer Orders', () => {
    beforeAll(() => {
      Date.now = jest.fn(() => 0);
    });

    afterAll(() => {
      Date.now = now;
    });

    it('renders correctly when not fetching', () => {
      const shallowWrapper = shallow(<Orders
        user={caterer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        orders={caterersOrdersObj.orders}
        isFetching={false}
        metadata={metadata}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('OrderPill')).toBeTruthy();
    });
    it('renders Preloader when fetching', () => {
      const shallowWrapper = shallow(<Orders
        user={caterer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        orders={caterersOrdersObj.orders}
        isFetching
        metadata={metadata}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('Preloader')).toBeTruthy();
    });

    it('calls fetchOrders when loadMoreOrders is called', () => {
      const fetchOrdersMock = jest.fn();

      const shallowWrapper = shallow(<Orders
        user={caterer}
        logout={jest.fn()}
        fetchOrders={fetchOrdersMock}
        orders={caterersOrdersObj.orders}
        isFetching
        metadata={{}}
      />);

      shallowWrapper.instance().loadMoreOrders();

      expect(fetchOrdersMock).toHaveBeenCalledTimes(2);
    });

    it('renders message when not fetching and there are no orders', () => {
      const shallowWrapper = shallow(<Orders
        user={caterer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        orders={[]}
        isFetching
        metadata={metadata}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('p').text()).toEqual('You Have No Orders');
    });

    it('renders connected component', () => {
      const comp = (
        <Provider store={store}>
          <ConnectedOrders
            user={caterer}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get());

      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    });
  });

  describe('Customer Orders', () => {
    it('renders correctly when not fetching', () => {
      const shallowWrapper = shallow(<Orders
        user={customer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        orders={customersOrdersObj.orders}
        isFetching={false}
        metadata={metadata}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('OrderPill')).toBeTruthy();
    });

    it('renders Preloader when fetching', () => {
      const shallowWrapper = shallow(<Orders
        user={customer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        orders={customersOrdersObj.orders}
        metadata={metadata}
        isFetching
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('Preloader')).toBeTruthy();
    });

    it('calls fetchOrders when loadMoreOrders is called', () => {
      const fetchOrdersMock = jest.fn();

      const shallowWrapper = shallow(<Orders
        user={customer}
        logout={jest.fn()}
        fetchOrders={fetchOrdersMock}
        orders={customersOrdersObj.orders}
        metadata={{}}
        isFetching
      />);

      shallowWrapper.instance().loadMoreOrders();

      expect(fetchOrdersMock).toHaveBeenCalledTimes(2);
    });

    it('renders message when not fetching and there are no orders', () => {
      const shallowWrapper = shallow(<Orders
        user={customer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        orders={[]}
        isFetching
        metadata={{}}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('p').text()).toEqual('You Have No Orders');
    });

    it('renders connected component', () => {
      const comp = (
        <Provider store={store}>
          <ConnectedOrders
            user={customer}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get());

      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    });
  });
});
