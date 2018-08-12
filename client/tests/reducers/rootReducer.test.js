import rootReducer from '../../src/reducers/rootReducer';
import { initialState } from '../setup/mockData';

describe('Root Reducer', () => {
  it('should return initial state', () => {
    const store = rootReducer(initialState, '');

    expect(store).toEqual(initialState);
  });

  it('should clear the store when UNAUTHENTICATED action is passed', () => {
    const store = rootReducer({
      ...initialState,
      isFetching: true
    }, { type: 'UNAUTHENTICATED' });

    expect(store.isFetching).toEqual(false);
  });
});

