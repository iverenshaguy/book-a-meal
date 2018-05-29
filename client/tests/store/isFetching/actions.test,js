import { setFetching, unsetFetching } from '../../../src/store/operations/isFetching';

describe('isFetching Actions', () => {
  it('should return type SET_FETCHING', () => {
    const fetchStatus = setFetching();

    expect(fetchStatus).toEqual({ type: 'SET_FETCHING' });
  });

  it('should return type UNSET_FETCHING', () => {
    const fetchStatus = unsetFetching();

    expect(fetchStatus).toEqual({ type: 'UNSET_FETCHING' });
  });
});

