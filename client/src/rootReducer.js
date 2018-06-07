import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import auth from './store/reducers/auth';
import isFetching from './store/reducers/isFetching';
import orders from './store/reducers/orders';

export const history = createHistory();

export default combineReducers({
  router: routerReducer,
  auth,
  isFetching,
  orders
});
