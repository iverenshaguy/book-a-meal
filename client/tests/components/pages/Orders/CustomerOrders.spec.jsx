import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import OrderConfirmationComponent from '../../../../src/components/pages/Orders/CustomerOrders/OrderConfirmation';
import OrderConfirmationContainer from '../../../../src/containers/pages/Orders/CustomerOrders/OrderConfirmation';
import OrderReviewComponent from '../../../../src/components/pages/Orders/CustomerOrders/OrderReview';
import { customer, initialState, localStorageOrder } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...customer } }
});

describe('Customer Orders', () => {
  beforeEach(() => {
    localStorage.setItem('bookamealorder', JSON.stringify(localStorageOrder));
  });

  describe('Order Confirmation', () => {
    it('should render the OrderConfirmation component correctly', () => {
      const shallowWrapper = shallow(<OrderConfirmationComponent
        user={customer}
        addOrder={jest.fn()}
        editOrder={jest.fn()}
      />);

      expect(shallowWrapper.find('OrderSummary').length).toBeTruthy();
    });

    it('should redirect to the Menu page when there is no order to confirm', () => {
      localStorage.removeItem('bookamealorder');

      const shallowWrapper = shallow(<OrderConfirmationComponent
        user={customer}
        addOrder={jest.fn()}
        editOrder={jest.fn()}
      />);

      expect(shallowWrapper.find('Redirect')).toBeTruthy();
      expect(shallowWrapper.find('Redirect').props().to).toEqual('/');
    });

    it('should render the connected OrderConfirmation component correctly', () => {
      const comp = (
        <Provider store={store}>
          <OrderConfirmationContainer
            user={customer}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get());

      expect(wrapper.find('OrderSummary').length).toBeTruthy();
      wrapper.unmount();
    });

    it('should call the handleSubmit method when checking of the order basket', () => {
      const addOrderMock = jest.fn();
      const editOrderMock = jest.fn();

      const comp = (
        <Provider store={store}>
          <OrderConfirmationComponent
            user={customer}
            addOrder={addOrderMock}
            editOrder={editOrderMock}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get()).find(OrderConfirmationComponent);

      wrapper.find('#checkout').simulate('click');

      const storedOrder = localStorage.getItem('bookamealorder');

      expect(storedOrder).toBe(null);
      expect(addOrderMock).toHaveBeenCalled();
      expect(editOrderMock).not.toHaveBeenCalled();
    });

    it('should call the handleSubmit method when updating an existing order', () => {
      localStorage.setItem('bookamealorder', JSON.stringify({
        ...localStorageOrder,
        order: {
          ...localStorageOrder.order,
          id: 'f7247d3a-de8a-43e2-90f6-b126cd4c491c'
        }
      }));

      const addOrderMock = jest.fn();
      const editOrderMock = jest.fn();

      const comp = (
        <Provider store={store}>
          <OrderConfirmationComponent
            user={customer}
            addOrder={addOrderMock}
            editOrder={editOrderMock}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get()).find(OrderConfirmationComponent);

      wrapper.find('#checkout').simulate('click');

      const storedOrder = localStorage.getItem('bookamealorder');

      expect(storedOrder).toBe(null);
      expect(editOrderMock).toHaveBeenCalled();
      expect(addOrderMock).not.toHaveBeenCalled();
    });
  });

  describe('Order Review', () => {
    it('should render the OrderReview component correctly', () => {
      const shallowWrapper = shallow(<OrderReviewComponent
        user={customer}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
    });

    it('should redirect when there is no order to review', () => {
      localStorage.removeItem('bookamealorder');

      const shallowWrapper = shallow(<OrderReviewComponent
        user={customer}
      />);

      expect(shallowWrapper.find('Redirect')).toBeTruthy();
    });

    it('should handle input change when number and address fields change', () => {
      const comp = (
        <Provider store={store}>
          <OrderReviewComponent
            user={customer}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get()).find(OrderReviewComponent);

      const handleInputChange = jest.spyOn(wrapper.instance(), 'handleInputChange');

      wrapper.find('input#deliveryPhoneNo').simulate('focus');
      wrapper.find('input#deliveryAddress').simulate('focus');
      wrapper.find('input#deliveryPhoneNo').simulate('change', { target: { name: 'number', value: '08122334455' } });
      wrapper.find('input#deliveryAddress').simulate('change', { target: { name: 'address', value: '2, Chruch Street, Place' } });
      wrapper.find('input#deliveryPhoneNo').simulate('blur');
      wrapper.find('input#deliveryAddress').simulate('blur');

      const storedOrder = JSON.parse(localStorage.getItem('bookamealorder'));

      expect(storedOrder.order.number).toEqual('08122334455');
      expect(storedOrder.order.address).toEqual('2, Chruch Street, Place');
      expect(handleInputChange).toHaveBeenCalled();
    });

    it('should validate the review form and submit a valid form', () => {
      const comp = (
        <Provider store={store}>
          <OrderReviewComponent
            user={customer}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get()).find(OrderReviewComponent);

      const handleOrderDetailsSubmitMock = jest.spyOn(wrapper.instance(), 'handleOrderDetailsSubmit');
      const toggleOrderSummaryMock = jest.spyOn(wrapper.instance(), 'toggleOrderSummary');

      wrapper.find('input#deliveryPhoneNo').simulate('focus');
      wrapper.find('input#deliveryAddress').simulate('focus');
      wrapper.find('input#deliveryPhoneNo').simulate('change', { target: { name: 'deliveryPhoneNo', value: '08122334455' } });
      wrapper.find('input#deliveryAddress').simulate('change', { target: { name: 'deliveryAddress', value: '2, Chruch Street, Place' } });
      wrapper.find('input#deliveryPhoneNo').simulate('blur');
      wrapper.find('input#deliveryAddress').simulate('blur');

      wrapper.find('button[type="submit"]').simulate('click');

      expect(handleOrderDetailsSubmitMock).toHaveBeenCalled();
      expect(toggleOrderSummaryMock).toHaveBeenCalled();
    });

    it('should validate the review form and not submit an invalid form', () => {
      const comp = (
        <Provider store={store}>
          <OrderReviewComponent
            user={customer}
          />
        </Provider>
      );

      const wrapper = mount(comp, rrcMock.get()).find(OrderReviewComponent);

      const handleOrderDetailsSubmitMock = jest.spyOn(wrapper.instance(), 'handleOrderDetailsSubmit');
      const toggleOrderSummaryMock = jest.spyOn(wrapper.instance(), 'toggleOrderSummary');

      wrapper.find('input#deliveryPhoneNo').simulate('focus');
      wrapper.find('input#deliveryAddress').simulate('focus');
      wrapper.find('input#deliveryPhoneNo').simulate('change', { target: { name: 'deliveryPhoneNo', value: '8122334455' } });
      wrapper.find('input#deliveryAddress').simulate('change', { target: { name: 'deliveryAddress', value: '2, Chruch Street, Place' } });
      wrapper.find('input#deliveryPhoneNo').simulate('blur');
      wrapper.find('input#deliveryAddress').simulate('blur');

      wrapper.find('button[type="submit"]').simulate('click');

      expect(handleOrderDetailsSubmitMock).toHaveBeenCalled();
      expect(toggleOrderSummaryMock).not.toHaveBeenCalled();
    });
  });
});
