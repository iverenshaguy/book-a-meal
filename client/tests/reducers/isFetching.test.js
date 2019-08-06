import isFetching from '../../src/reducers/isFetching';
import { setFetching, unsetFetching } from '../../src/actions/isFetching';

describe('isFetching Reducers', () => {
  it('should return initial state', () => {
    const newState = isFetching(undefined, {});

    expect(newState).toEqual(false);
  });

  it('should change isFetching to true', () => {
    const newState = isFetching(false, setFetching());

    expect(newState).toEqual(true);
  });

  it('should change isFetching to false', () => {
    const newState = isFetching(true, unsetFetching());

    expect(newState).toEqual(false);
  });
});
