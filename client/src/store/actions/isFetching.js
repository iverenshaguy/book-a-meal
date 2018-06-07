import { SET_FETCHING, UNSET_FETCHING } from '../types';

export const setFetching = () => ({
  type: SET_FETCHING
});

export const unsetFetching = () => ({
  type: UNSET_FETCHING
});
