import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import instance from '../../../src/config/axios';
import operations from '../../../src/store/operations/orders';
import { deliverOrder as deliverOrderData, caterersOrdersObj, caterersOrdersObjPerDay, customerOrder, orderRequest, metadata } from '../../setup/data';

const {
  addOrder,
  editOrder,
  cancelOrder,
  fetchOrders,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  deliverOrder,
  setDelivering,
  unsetDelivering,
  addOrderSuccess,
  addOrderFailure,
  editOrderSuccess,
  editOrderFailure,
  deliverOrderSuccess,
  deliverOrderFailure,
} = operations;

const url = '/api/v1';
const middlewares = [thunk];
const mockReq = new MockAdapter(instance);
const mockStore = configureMockStore(middlewares);

// configure Mock store
const store = mockStore({
  items: [],
  pendingOrders: 0,
  totalCashEarned: 0,
  error: null,
  metadata: {}
});

process.env.EXPIRY = 2000;
describe('Orders Actions', () => {
  test('fetchOrdersSuccess', () => {
    const action = fetchOrdersSuccess('RECEIVE_ORDERS_SUCCESS', caterersOrdersObj);

    expect(action).toEqual({
      type: 'RECEIVE_ORDERS_SUCCESS',
      payload: caterersOrdersObj
    });
  });

  test('fetchOrdersFailure', () => {
    const action = fetchOrdersFailure('error');

    expect(action).toEqual({
      type: 'RECEIVE_ORDERS_FAILURE',
      payload: 'error'
    });
  });

  test('setDelivering', () => {
    const action = setDelivering();

    expect(action).toEqual({ type: 'SET_DELIVERING' });
  });

  test('unsetDelivering', () => {
    const action = unsetDelivering();

    expect(action).toEqual({ type: 'UNSET_DELIVERING' });
  });

  test('deliverOrderSuccess', () => {
    const action = deliverOrderSuccess(deliverOrderData);

    expect(action).toEqual({ type: 'DELIVER_ORDER_SUCCESS', payload: deliverOrderData });
  });

  test('deliverOrderFailure', () => {
    const action = deliverOrderFailure('error');

    expect(action).toEqual({
      type: 'DELIVER_ORDER_FAILURE',
      payload: 'error'
    });
  });

  test('addOrderSuccess', () => {
    const action = addOrderSuccess(customerOrder);

    expect(action).toEqual({
      type: 'ADD_ORDER_SUCCESS',
      payload: customerOrder
    });
  });

  test('addOrderFailure', () => {
    const action = addOrderFailure('error');

    expect(action).toEqual({
      type: 'ADD_ORDER_FAILURE',
      payload: 'error'
    });
  });

  test('editOrderSuccess', () => {
    const action = editOrderSuccess(customerOrder);

    expect(action).toEqual({
      type: 'EDIT_ORDER_SUCCESS',
      payload: customerOrder
    });
  });

  test('editOrderFailure', () => {
    const action = editOrderFailure('error');

    expect(action).toEqual({
      type: 'EDIT_ORDER_FAILURE',
      payload: 'error'
    });
  });

  describe('Orders Operations', () => {
    afterEach(() => {
      store.clearActions();
    });

    describe('Orders', () => {
      it('dispatches SET_FETCHING, RECEIVE_ORDERS_SUCCESS and UNSET_FETCHING on successful fetching of caterer orders', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_ORDERS_SUCCESS', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/orders`).reply(200, caterersOrdersObj);

        return store.dispatch(fetchOrders()).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_ORDERS_SUCCESS and UNSET_FETCHING when date is given', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_ORDERS_SUCCESS', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/orders?date=2018-05-27`).reply(200, caterersOrdersObjPerDay);

        return store.dispatch(fetchOrders('2018-05-27')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });


      it('dispatches RECEIVE_MORE_ORDERS_SUCCESS and UNSET_FETCHING when metadata is given', () => {
        const expectedActions = ['RECEIVE_MORE_ORDERS_SUCCESS', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/orders?date=2018-05-27&limit=5`).reply(200, caterersOrdersObjPerDay);

        return store.dispatch(fetchOrders('2018-05-27', { ...metadata, next: `${url}/orders?date=2018-05-27&limit=5` })).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_ORDERS_FAILURE and UNSET_FETCHING on unsuccessful fetching', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_ORDERS_FAILURE', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/orders`).reply(401, { error: 'Error' });

        return store.dispatch(fetchOrders()).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_DELIVERING, DELIVER_ORDER_SUCCESS and UNSET_DELIVERING on successful order delivery', () => {
        const expectedActions = ['SET_DELIVERING', 'DELIVER_ORDER_SUCCESS', 'UNSET_DELIVERING'];

        mockReq.onPost(`${url}/orders/fb097bde-5959-45ff-8e21-51184fa60c26/deliver`).reply(200, deliverOrderData);

        return store.dispatch(deliverOrder('fb097bde-5959-45ff-8e21-51184fa60c26')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_DELIVERING, DELIVER_ORDER_FAILURE and UNSET_DELIVERING on unsuccessful order delivery', () => {
        const expectedActions = ['SET_DELIVERING', 'DELIVER_ORDER_FAILURE', 'UNSET_DELIVERING'];

        mockReq.onPost(`${url}/orders/fb097bde-5959-45ff-8e21-51184fa60c26/deliver`).reply(401, { error: 'An Error' });

        return store.dispatch(deliverOrder('fb097bde-5959-45ff-8e21-51184fa60c26')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_ORDER_WORKING, ADD_ORDER_SUCCESS, TOGGLE_MODAL, @@router/CALL_HISTORY_METHOD,  and UNSET_ORDER_WORKING on successful order addition', () => {
        const expectedActions = ['SET_ORDER_WORKING', 'ADD_ORDER_SUCCESS', 'UNSET_ORDER_WORKING', '@@router/CALL_HISTORY_METHOD'];

        mockReq.onPost(`${url}/orders`).reply(201, customerOrder);

        jest.useFakeTimers();

        return store.dispatch(addOrder(orderRequest)).then(() => {
          jest.advanceTimersByTime(1500);
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_ORDER_WORKING, ADD_ORDER_FAILURE and UNSET_ORDER_WORKING on usuccessful order addition', () => {
        const expectedActions = ['SET_ORDER_WORKING', 'ADD_ORDER_FAILURE', 'UNSET_ORDER_WORKING'];

        mockReq.onPost(`${url}/orders`).reply(401, { error: 'An Error' });

        return store.dispatch(addOrder(orderRequest)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_ORDER_WORKING, EDIT_ORDER_SUCCESS, TOGGLE_MODAL, @@router/CALL_HISTORY_METHOD,  and UNSET_ORDER_WORKING on successful order edit', () => {
        const expectedActions = ['SET_ORDER_WORKING', 'EDIT_ORDER_SUCCESS', 'UNSET_ORDER_WORKING', '@@router/CALL_HISTORY_METHOD'];

        mockReq.onPut(`${url}/orders/${customerOrder.id}`).reply(200, customerOrder);

        jest.useFakeTimers();

        return store.dispatch(editOrder(customerOrder.id, customerOrder)).then(() => {
          jest.advanceTimersByTime(1500);
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_ORDER_WORKING, EDIT_ORDER_FAILURE and UNSET_ORDER_WORKING on usuccessful order edit', () => {
        const expectedActions = ['SET_ORDER_WORKING', 'EDIT_ORDER_FAILURE', 'UNSET_ORDER_WORKING'];

        mockReq.onPut(`${url}/orders/${customerOrder.id}`).reply(401, { error: 'An Error' });

        return store.dispatch(editOrder(customerOrder.id, customerOrder)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_ORDER_WORKING, CANCEL_ORDER_SUCCESS, TOGGLE_MODAL, @@router/CALL_HISTORY_METHOD, and UNSET_ORDER_WORKING on successful order cancelation', () => {
        const expectedActions = ['SET_ORDER_WORKING', 'CANCEL_ORDER_SUCCESS', 'UNSET_ORDER_WORKING', '@@router/CALL_HISTORY_METHOD'];

        mockReq.onPut(`${url}/orders/${customerOrder.id}`).reply(200, customerOrder);

        jest.useFakeTimers();

        return store.dispatch(cancelOrder(customerOrder.id)).then(() => {
          jest.advanceTimersByTime(1500);
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_ORDER_WORKING, CANCEL_ORDER_FAILURE and UNSET_ORDER_WORKING on unsuccessful order cancelation', () => {
        const expectedActions = ['SET_ORDER_WORKING', 'CANCEL_ORDER_FAILURE', 'UNSET_ORDER_WORKING'];

        mockReq.onPut(`${url}/orders/${customerOrder.id}`).reply(401, { error: 'An Error' });

        return store.dispatch(cancelOrder(customerOrder.id)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});
