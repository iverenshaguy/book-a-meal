import { setFetching, unsetFetching } from '../../src/actions/isFetching';

describe('isFetching Actions', () => {
  describe('setFetching', () => {
    it('should return an object with type SET_FETCHING', () => {
      const fetchStatus = setFetching();

      expect(fetchStatus).toEqual({ type: 'SET_FETCHING' });
    });
  });

  describe('unsetFetching', () => {
    it('should return type UNSET_FETCHING', () => {
      const fetchStatus = unsetFetching();

      expect(fetchStatus).toEqual({ type: 'UNSET_FETCHING' });
    });
  });
});
