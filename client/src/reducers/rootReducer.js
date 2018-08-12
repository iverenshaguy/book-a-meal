import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import createHistory from 'history/createBrowserHistory';
import { UNAUTHENTICATED } from '../actions/actionTypes';
import singleOrder from './singleOrder';
import uploadImage from './uploadImage';
import isFetching from './isFetching';
import orders from './orders';
import meals from './meals';
import menu from './menu';
import auth from './auth';
import ui from './ui';

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
