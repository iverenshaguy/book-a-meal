import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import OrdersComponent from '../../../../src/components/pages/Orders';
import OrdersContainer from '../../../../src/containers/pages/Orders';
import {
  caterer,
  caterersOrdersObj,
  customer,
  customersOrdersObj,
  initialState,
  metadata
} from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ ...initialState });

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

    it('should render Caterer Orders component correctly', () => {
      const shallowWrapper = shallow(<OrdersComponent
        user={caterer}
        fetchOrders={jest.fn()}
        orders={caterersOrdersObj.orders}
        metadata={metadata}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('OrderPill')).toBeTruthy();
    });

    it('should start fetching more order items when Orders Component triggers the loadMoreOrders function', () => {
      const fetchOrdersMock = jest.fn();

      const shallowWrapper = shallow(<OrdersComponent
        user={caterer}
        fetchOrders={fetchOrdersMock}
        orders={caterersOrdersObj.orders}
        metadata={{}}
      />);

      shallowWrapper.instance().loadMoreOrders();

      expect(fetchOrdersMock).toHaveBeenCalledTimes(2);
    });

    it('should render a message when there are no orders to show', () => {
      const shallowWrapper = shallow(<OrdersComponent
        user={caterer}
        fetchOrders={jest.fn()}
        orders={[]}
        metadata={metadata}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('p').text()).toEqual('You Have No Orders');
    });

    it('should render the connected Caterer Orders component correctly', () => {
      const comp = (
        <Provider store={store}>
          <OrdersContainer
            user={caterer}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get());

      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    });
  });

  describe('Customer Orders', () => {
    it('should render Customer Orders component correctly', () => {
      const shallowWrapper = shallow(<OrdersComponent
        user={customer}
        fetchOrders={jest.fn()}
        orders={customersOrdersObj.orders}
        metadata={metadata}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('OrderPill')).toBeTruthy();
    });

    it('should start fetching more order items when Orders Component triggers the loadMoreOrders function', () => {
      const fetchOrdersMock = jest.fn();

      const shallowWrapper = shallow(<OrdersComponent
        user={customer}
        fetchOrders={fetchOrdersMock}
        orders={customersOrdersObj.orders}
        metadata={{}}
      />);

      shallowWrapper.instance().loadMoreOrders();

      expect(fetchOrdersMock).toHaveBeenCalledTimes(2);
    });

    it('should render a message when there are no orders to show', () => {
      const shallowWrapper = shallow(<OrdersComponent
        user={customer}
        fetchOrders={jest.fn()}
        orders={[]}
        metadata={{}}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('p').text()).toEqual('You Have No Orders');
    });

    it('should render the connected Customer Orders component correctly', () => {
      const comp = (
        <Provider store={store}>
          <OrdersContainer
            user={customer}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get());

      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    });
  });
});
