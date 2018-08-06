import reducer from '../../../src/store/reducers/orders';
import { deliverOrder as deliverOrderData, caterersOrdersObj, customerOrder, customersOrdersObj, metadata } from '../../setup/data';


const state = {
  items: [],
  delivering: false,
  pendingOrders: 0,
  totalCashEarned: 0,
  error: null,
  working: false,
  metadata: {}
};

describe('Orders Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle RECEIVE_ORDERS_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_ORDERS_SUCCESS',
      payload: {
        ...caterersOrdersObj,
        metadata
      }
    });

    expect(newState).toEqual({
      ...state,
      items: caterersOrdersObj.orders,
      pendingOrders: caterersOrdersObj.pendingOrders,
      totalCashEarned: caterersOrdersObj.totalCashEarned,
      metadata
    });
  });

  it('should handle RECEIVE_MORE_ORDERS_SUCCESS action', () => {
    const newState = reducer({ ...state, items: caterersOrdersObj.orders }, {
      type: 'RECEIVE_MORE_ORDERS_SUCCESS',
      payload: {
        ...caterersOrdersObj,
        metadata
      }
    });

    expect(newState).toEqual({
      ...state,
      items: [...caterersOrdersObj.orders, ...caterersOrdersObj.orders],
      pendingOrders: caterersOrdersObj.pendingOrders,
      totalCashEarned: caterersOrdersObj.totalCashEarned,
      metadata
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

  it('should handle ADD_ORDER_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'ADD_ORDER_SUCCESS',
      payload: customerOrder
    });

    expect(newState).toEqual({
      ...state,
      items: [...state.items, customerOrder],
    });
  });

  it('should handle RECEIVE_ORDERS_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_ORDERS_FAILURE',
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

  it('should handle ADD_ORDER_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'ADD_ORDER_FAILURE',
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

  it('should handle SET_WORKING action', () => {
    const newState = reducer(state, {
      type: 'SET_ORDER_WORKING'
    });

    expect(newState).toEqual({ ...state, working: true });
  });

  it('should handle UNSET_WORKING action', () => {
    const newState = reducer({ ...state, working: true }, {
      type: 'UNSET_ORDER_WORKING'
    });

    expect(newState).toEqual({ ...state, working: false });
  });

  it('should handle EDIT_ORDER_SUCCESS action', () => {
    const stateWithOrders = {
      ...state,
      items: [
        ...customersOrdersObj.orders,
        customerOrder
      ]
    };

    const editedOrder = { ...customerOrder, deliveryAddress: 'Church Road' };
    const newState = reducer(
      stateWithOrders,
      {
        type: 'EDIT_ORDER_SUCCESS',
        payload: editedOrder
      }
    );

    expect(newState).toEqual({
      ...stateWithOrders,
      items: [
        ...stateWithOrders.items.slice(0, 4),
        {
          ...stateWithOrders.items[4],
          ...editedOrder
        }
      ],
    });
  });

  it('should handle EDIT_ORDER_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'EDIT_ORDER_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle CANCEL_ORDER_SUCCESS action', () => {
    const stateWithOrders = {
      ...state,
      items: [
        ...customersOrdersObj.orders,
        customerOrder
      ]
    };

    const canceledOrder = { ...customerOrder, status: 'canceled' };
    const newState = reducer(
      stateWithOrders,
      {
        type: 'CANCEL_ORDER_SUCCESS',
        payload: canceledOrder
      }
    );

    expect(newState).toEqual({
      ...stateWithOrders,
      items: [
        ...stateWithOrders.items.slice(0, 4),
        {
          ...stateWithOrders.items[4],
          ...canceledOrder
        }
      ],
    });
  });

  it('should handle CANCEL_ORDER_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'CANCEL_ORDER_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });
});
