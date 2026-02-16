import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { createBrowserHistory } from 'history';
import { UNAUTHENTICATED } from 'src/features/auth/constants/actionTypes';
import singleOrder from 'src/features/order-details/data/reducer';
import uploadImage from 'src/features/common/data/images/reducer';
import orders from 'src/features/orders/data/reducer';
import meals from 'src/features/meals/data/reducer';
import menu from 'src/features/menu/data/reducer';
import auth from 'src/features/auth/data/reducer';
import ui, { isFetching } from 'src/features/common/data/reducer';

export const history = createBrowserHistory();

const appReducer = combineReducers({
  router: connectRouter(history),
  toastr: toastrReducer,
  singleOrder,
  uploadImage,
  isFetching,
  orders,
  meals,
  menu,
  auth,
  ui,
});

/**
 * Root Reducers that resets the store on logout
 * @param {object} state
 * @param {string} action
 * @return {func} appReducer function
 */
export default (state, action) => {
  if (action.type === UNAUTHENTICATED) {
    state = undefined;
  }

  return appReducer(state, action);
};
