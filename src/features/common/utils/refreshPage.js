import decodeToken from 'src/features/common/utils/decodeToken';
import { resetUser, authenticateUser } from 'src/features/auth/data/actions';

/**
 * Refreshes and re-authenticates page with token in local storage
 * @function refreshPage
 * @param {store} store - store
 * @returns {void}
 */
const refreshPage = (store) => {
  if (localStorage.getItem('jwtToken')) {
    const {
      decoded: { exp },
    } = decodeToken();

    if (exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem('jwtToken');
      store.dispatch(resetUser());
    } else {
      store.dispatch(authenticateUser());
    }
  } else {
    store.dispatch(resetUser());
  }
};

export default refreshPage;
