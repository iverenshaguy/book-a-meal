import reducer from '../../../src/store/reducers/orders';
import { deliverOrder as deliverOrderData, caterersOrdersObj } from '../../setup/data';


const state = {
  items: [],
  delivering: false,
  pendingOrders: 0,
  totalCashEarned: 0,
  error: null
};

describe('Orders Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle RECEIVE_CATERERS_ORDERS_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_CATERERS_ORDERS_SUCCESS',
      payload: caterersOrdersObj
    });

    expect(newState).toEqual({
      ...state,
      items: caterersOrdersObj.orders,
      pendingOrders: caterersOrdersObj.pendingOrders,
      totalCashEarned: caterersOrdersObj.totalCashEarned
    });
  });

  it('should handle DELIVER_ORDER_SUCCESS action', () => {
    const stateWithOrders = {
      items: caterersOrdersObj.orders,
      pendingOrders: caterersOrdersObj.pendingOrders,
      totalCashEarned: caterersOrdersObj.totalCashEarned,
      error: null
    };

    const newState = reducer(stateWithOrders, {
      type: 'DELIVER_ORDER_SUCCESS',
      payload: deliverOrderData,
    });

    expect(newState).toEqual({
      ...stateWithOrders,
      items: [
        ...stateWithOrders.items.slice(0, 2),
        {
          ...stateWithOrders.items[2],
          ...deliverOrderData
        },
        ...stateWithOrders.items.slice(3)
      ],
      pendingOrders: stateWithOrders.pendingOrders - 1,
      totalCashEarned: stateWithOrders.totalCashEarned + 1200,
      error: null
    });
  });

  it('should handle RECEIVE_CATERERS_ORDERS_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_CATERERS_ORDERS_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle DELIVER_ORDER_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'DELIVER_ORDER_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle SET_DELIVERING action', () => {
    const newState = reducer(state, {
      type: 'SET_DELIVERING'
    });

    expect(newState).toEqual({ ...state, delivering: true });
  });

  it('should handle UNSET_DELIVERING action', () => {
    const newState = reducer({ ...state, delivering: true }, {
      type: 'UNSET_DELIVERING'
    });

    expect(newState).toEqual({ ...state, delivering: false });
  });
});
