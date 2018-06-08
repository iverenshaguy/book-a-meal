import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import uploadImage from './store/reducers/uploadImage';
import isFetching from './store/reducers/isFetching';
import orders from './store/reducers/orders';
import meals from './store/reducers/meals';
import auth from './store/reducers/auth';
import ui from './store/reducers/ui';

export const history = createHistory();

export default combineReducers({
  router: routerReducer,
  uploadImage,
  isFetching,
  orders,
  meals,
  auth,
  ui
});
