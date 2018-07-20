import decodeToken from './decodeToken';
import { resetUser, authenticateUser } from '../store/operations/auth';

/**
 * Refreshes and reauthenticates page with token in local storage
 * @function refreshPage
 * @param {store} store - store
 * @returns {void}
 */
const refreshPage = (store) => {
  if (localStorage.getItem('jwtToken')) {
    const { decoded: { exp } } = decodeToken();
    // if token is expired
    if (exp < Math.floor(Date.now() / 1000)) {
      // remove empty token and log user out
      localStorage.removeItem('jwtToken');
      store.dispatch(resetUser());
    } else {
      // reauthenticate token and refresh user
      store.dispatch(authenticateUser());
    }
  } else {
    store.dispatch(resetUser());
  }
};

export default refreshPage;
