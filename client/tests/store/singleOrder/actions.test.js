import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import instance from '../../../src/config/axios';
import operations from '../../../src/store/operations/singleOrder';
import { customerOrder } from '../../setup/data';

const { fetchOrder, fetchOrderSuccess, fetchOrderFailure } = operations;

const url = '/api/v1';
const middlewares = [thunk];
const mockReq = new MockAdapter(instance);
const mockStore = configureMockStore(middlewares);

// configure Mock store
const store = mockStore({ item: null, error: null });

process.env.EXPIRY = 2000;
describe('Orders Actions', () => {
  test('fetchOrdersSuccess', () => {
    const action = fetchOrderSuccess(customerOrder);

    expect(action).toEqual({
      type: 'RECEIVE_ORDER_SUCCESS',
      payload: customerOrder
    });
  });

  test('fetchOrdersFailure', () => {
    const action = fetchOrderFailure('error');

    expect(action).toEqual({
      type: 'RECEIVE_ORDER_FAILURE',
      payload: 'error'
    });
  });

  describe('Single Order Operations', () => {
    afterEach(() => {
      store.clearActions();
    });

    describe('Single Order', () => {
      it('dispatches SET_FETCHING, RECEIVE_ORDER_SUCCESS and UNSET_FETCHING on successful fetching of caterer orders', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_ORDER_SUCCESS', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/orders/12345`).reply(200, customerOrder);

        return store.dispatch(fetchOrder('12345')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_ORDER_FAILURE and UNSET_FETCHING on unsuccessful fetching', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_ORDER_FAILURE', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/orders/12345`).reply(401, { error: 'Error' });

        return store.dispatch(fetchOrder('12345')).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});
