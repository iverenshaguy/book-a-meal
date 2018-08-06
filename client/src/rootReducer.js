import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import createHistory from 'history/createBrowserHistory';
import { UNAUTHENTICATED } from './store/types';
import singleOrder from './store/reducers/singleOrder';
import uploadImage from './store/reducers/uploadImage';
import isFetching from './store/reducers/isFetching';
import orders from './store/reducers/orders';
import meals from './store/reducers/meals';
import menu from './store/reducers/menu';
import auth from './store/reducers/auth';
import ui from './store/reducers/ui';

export const history = createHistory();

const appReducer = combineReducers({
  router: routerReducer,
  toastr: toastrReducer,
  singleOrder,
  uploadImage,
  isFetching,
  orders,
  meals,
  menu,
  auth,
  ui
});

/**
 * Root Reducers that resets a store on logout or returns a new store
 * @param {object} state
 * @param {string} action
 * @return {func} appReducer function
 * Dan Abramov at https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992
 */
export default (state, action) => {
  if (action.type === UNAUTHENTICATED) {
    state = undefined;
  }

  return appReducer(state, action);
};
