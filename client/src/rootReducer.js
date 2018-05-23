import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import authReducer from './app/pages/Auth/duck';

export const history = createHistory();

export default combineReducers({
  router: routerReducer,
  auth: authReducer
});
