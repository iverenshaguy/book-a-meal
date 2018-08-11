import rootReducer from '../../src/rootReducer';
import { initialValues } from '../setup/mockData';

describe('Root Reducer', () => {
  it('should return initial state', () => {
    const store = rootReducer(initialValues, '');

    expect(store).toEqual(initialValues);
  });

  it('should clear the store when UNAUTHENTICATED action is passed', () => {
    const store = rootReducer({
      ...initialValues,
      isFetching: true
    }, { type: 'UNAUTHENTICATED' });

    expect(store.isFetching).toEqual(false);
  });
});

