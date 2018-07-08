import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import OrderConfirmation from '../../../../src/components/pages/Orders/CustomerOrders/OrderConfirmation/OrderConfirmation';
import ConnectedOrderConfirmation from '../../../../src/components/pages/Orders/CustomerOrders/OrderConfirmation';
import OrderReview from '../../../../src/components/pages/Orders/CustomerOrders/OrderReview/OrderReview';
import ConnectedOrderReview from '../../../../src/components/pages/Orders/CustomerOrders/OrderReview';
import { customer, initialValues, localStorageOrder } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ ...initialValues });

describe('Customer Orders', () => {
  beforeEach(() => {
    localStorage.setItem('bookamealorder', JSON.stringify(localStorageOrder));
  });

  describe('Order Confirmation', () => {
    it('renders correctly', () => {
      const shallowWrapper = shallow(<OrderConfirmation
        user={customer}
        logout={jest.fn()}
        addOrder={jest.fn()}
        isFetching={false}
      />);

      expect(shallowWrapper.find('OrderSummary').length).toBeTruthy();
    });

    it('redirects when there are no orders', () => {
      localStorage.setItem('bookamealorder', null);

      const shallowWrapper = shallow(<OrderConfirmation
        user={customer}
        logout={jest.fn()}
        addOrder={jest.fn()}
        isFetching
      />);

      expect(shallowWrapper.find('Redirect')).toBeTruthy();
    });

    it('renders connected component', () => {
      const comp = (
        <Provider store={store}>
          <ConnectedOrderConfirmation
            user={customer}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get());

      expect(wrapper.find('OrderSummary').length).toBeTruthy();
      wrapper.unmount();
    });

    it('calls handle submit on checkout', () => {
      const comp = (
        <Provider store={store}>
          <ConnectedOrderConfirmation
            user={customer}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get()).find(OrderConfirmation);

      wrapper.find('#checkout').simulate('click');

      const storedOrder = localStorage.getItem('bookamealorder');

      expect(storedOrder).toBe(undefined);
    });
  });

  describe('Order Review', () => {
    it('renders correctly', () => {
      const shallowWrapper = shallow(<OrderReview
        user={customer}
        logout={jest.fn()}
        isFetching={false}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
    });

    it('redirects when there are no orders', () => {
      localStorage.setItem('bookamealorder', null);

      const shallowWrapper = shallow(<OrderReview
        user={customer}
        logout={jest.fn()}
        isFetching
      />);

      expect(shallowWrapper.find('Redirect')).toBeTruthy();
    });

    it('renders connected component', () => {
      const comp = (
        <Provider store={store}>
          <ConnectedOrderReview
            user={customer}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get());

      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    });

    it('handles input change on number and address change', () => {
      const comp = (
        <Provider store={store}>
          <OrderReview
            user={customer}
            logout={jest.fn()}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get()).find(OrderReview);

      const handleInputChange = jest.spyOn(wrapper.instance(), 'handleInputChange');

      wrapper.find('input#number').simulate('focus');
      wrapper.find('input#address').simulate('focus');
      wrapper.find('input#number').simulate('change', { target: { name: 'number', value: '08122334455' } });
      wrapper.find('input#address').simulate('change', { target: { name: 'address', value: '2, Chruch Street, Place' } });
      wrapper.find('input#number').simulate('blur');
      wrapper.find('input#address').simulate('blur');

      const storedOrder = JSON.parse(localStorage.getItem('bookamealorder'));

      expect(storedOrder.order.number).toEqual('08122334455');
      expect(storedOrder.order.address).toEqual('2, Chruch Street, Place');
      expect(handleInputChange).toHaveBeenCalled();
    });

    it('validates form and submits valid form', () => {
      const comp = (
        <Provider store={store}>
          <OrderReview
            user={customer}
            logout={jest.fn()}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get()).find(OrderReview);

      const handleOrderDetailsSubmitMock = jest.spyOn(wrapper.instance(), 'handleOrderDetailsSubmit');
      const toggleOrderSummaryMock = jest.spyOn(wrapper.instance(), 'toggleOrderSummary');

      wrapper.find('input#number').simulate('focus');
      wrapper.find('input#address').simulate('focus');
      wrapper.find('input#number').simulate('change', { target: { name: 'number', value: '+2348122334455' } });
      wrapper.find('input#address').simulate('change', { target: { name: 'address', value: '2, Chruch Street, Place' } });
      wrapper.find('input#number').simulate('blur');
      wrapper.find('input#address').simulate('blur');

      wrapper.find('button[type="submit"]').simulate('click');

      expect(handleOrderDetailsSubmitMock).toHaveBeenCalled();
      expect(toggleOrderSummaryMock).toHaveBeenCalled();
    });

    it('validates form and doesnt submits valid form', () => {
      const comp = (
        <Provider store={store}>
          <OrderReview
            user={customer}
            logout={jest.fn()}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp, rrcMock.get()).find(OrderReview);

      const handleOrderDetailsSubmitMock = jest.spyOn(wrapper.instance(), 'handleOrderDetailsSubmit');
      const toggleOrderSummaryMock = jest.spyOn(wrapper.instance(), 'toggleOrderSummary');

      wrapper.find('input#number').simulate('focus');
      wrapper.find('input#address').simulate('focus');
      wrapper.find('input#number').simulate('change', { target: { name: 'number', value: '8122334455' } });
      wrapper.find('input#address').simulate('change', { target: { name: 'address', value: '2, Chruch Street, Place' } });
      wrapper.find('input#number').simulate('blur');
      wrapper.find('input#address').simulate('blur');

      wrapper.find('button[type="submit"]').simulate('click');

      expect(handleOrderDetailsSubmitMock).toHaveBeenCalled();
      expect(toggleOrderSummaryMock).not.toHaveBeenCalled();
    });
  });
});
