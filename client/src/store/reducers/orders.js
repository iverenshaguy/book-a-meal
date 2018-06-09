import {
  RECEIVE_CATERERS_ORDERS_SUCCESS, RECEIVE_CATERERS_ORDERS_FAILURE,
  DELIVER_ORDER_SUCCESS, DELIVER_ORDER_FAILURE, SET_DELIVERING, UNSET_DELIVERING
} from '../types';
import calculateCashEarnedFromOrder from '../../helpers/calculateCashEarnedFromOrder';
import getUpdatedItems from '../../helpers/getUpdatedItems';

const initialValues = {
  items: [],
  pendingOrders: 0,
  totalCashEarned: 0,
  delivering: false,
  error: null
};

export default (state = initialValues, action) => {
  switch (action.type) {
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
    case RECEIVE_CATERERS_ORDERS_FAILURE:
    case DELIVER_ORDER_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
