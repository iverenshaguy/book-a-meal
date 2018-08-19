import {
  RECEIVE_ORDERS_SUCCESS, RECEIVE_ORDERS_FAILURE,
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, SET_DELIVERING, UNSET_DELIVERING,
  ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE, SET_ORDER_WORKING, UNSET_ORDER_WORKING,
  EDIT_ORDER_SUCCESS, EDIT_ORDER_FAILURE, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_FAILURE,
  RECEIVE_MORE_ORDERS_SUCCESS
} from '../actions/actionTypes';
import calculateCashEarnedFromOrder from '../helpers/calculateCashEarnedFromOrder';
import getUpdatedItems from '../helpers/getUpdatedItems';

const initialState = {
  items: [],
  pendingOrders: 0,
  totalCashEarned: 0,
  working: false,
  delivering: false,
  error: null,
  metadata: {},
};

/**
 * Orders Reducer
 * @param {object} state defaults to initalState
 * @param {string} action action object (type, payload)
 * @returns {object} new state
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case EDIT_ORDER_SUCCESS:
    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        items: getUpdatedItems(state.items, action.payload),
      };
    case RECEIVE_ORDERS_SUCCESS:
      return {
        ...state,
        items: action.payload.orders,
        metadata: action.payload.metadata,
        pendingOrders: action.payload.pendingOrders,
        totalCashEarned: action.payload.totalCashEarned
      };
    case RECEIVE_MORE_ORDERS_SUCCESS:
      return {
        ...state,
        items: [...state.items, ...action.payload.orders],
        metadata: action.payload.metadata,
        pendingOrders: action.payload.pendingOrders,
        totalCashEarned: action.payload.totalCashEarned
      };
    case DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        items: getUpdatedItems(state.items, action.payload),
        pendingOrders: state.pendingOrders - 1,
        totalCashEarned: state.totalCashEarned +
          (calculateCashEarnedFromOrder(action.payload.meals))
      };
    case SET_DELIVERING:
      return { ...state, delivering: true };
    case UNSET_DELIVERING:
      return { ...state, delivering: false };
    case SET_ORDER_WORKING:
      return { ...state, working: true };
    case UNSET_ORDER_WORKING:
      return { ...state, working: false };
    case RECEIVE_ORDERS_FAILURE:
    case DELIVER_ORDER_FAILURE:
    case ADD_ORDER_FAILURE:
    case EDIT_ORDER_FAILURE:
    case CANCEL_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
