import {
  RECEIVE_CATERERS_ORDERS_SUCCESS, RECEIVE_CATERERS_ORDERS_FAILURE,
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, SET_DELIVERING, UNSET_DELIVERING,
  ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE, SET_ORDER_WORKING, UNSET_ORDER_WORKING,
  EDIT_ORDER_SUCCESS, EDIT_ORDER_FAILURE,
} from '../types';
import calculateCashEarnedFromOrder from '../../helpers/calculateCashEarnedFromOrder';
import getUpdatedItems from '../../helpers/getUpdatedItems';

const initialValues = {
  items: [],
  pendingOrders: 0,
  totalCashEarned: 0,
  working: false,
  delivering: false,
  error: null
};

export default (state = initialValues, action) => {
  switch (action.type) {
    case ADD_ORDER_SUCCESS:
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case RECEIVE_CATERERS_ORDERS_SUCCESS:
      return {
        ...state,
        items: action.payload.orders,
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
    case RECEIVE_CATERERS_ORDERS_FAILURE:
    case DELIVER_ORDER_FAILURE:
    case ADD_ORDER_FAILURE:
    case EDIT_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
