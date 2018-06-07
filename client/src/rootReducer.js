import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

export default combineReducers({
  router: routerReducer
});
