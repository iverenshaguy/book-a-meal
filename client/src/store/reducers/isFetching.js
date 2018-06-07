import { SET_FETCHING, UNSET_FETCHING } from '../types';

export default (state = false, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return true;
    case UNSET_FETCHING:
      return false;
    default:
      return state;
  }
};
