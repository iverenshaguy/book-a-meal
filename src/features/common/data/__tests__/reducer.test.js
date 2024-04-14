import reducer, { isFetching } from 'src/features/common/data/reducer';
import { setFetching, unsetFetching } from 'src/features/common/data/actions';

const state = {
  modals: {
    open: false,
    type: null,
  },
  sideNav: {
    open: false,
  },
};

describe('UI Reducers', () => {
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

  it('should return initial state', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle TOGGLE_MODAL action with payload', () => {
    const newState = reducer(state, {
      type: 'TOGGLE_MODAL',
      payload: 'addMeal',
    });

    expect(newState).toEqual({ ...state, modals: { open: true, type: 'addMeal' } });
  });

  it('should handle TOGGLE_MODAL action with no payload', () => {
    const newState = reducer(
      { ...state, modals: { ...state.modals, open: true } },
      {
        type: 'TOGGLE_MODAL',
        payload: null,
      }
    );

    expect(newState).toEqual({ ...state, modals: { ...state.modals, open: false } });
  });

  it('should handle TOGGLE_SIDENAV action', () => {
    const newState = reducer(state, { type: 'TOGGLE_SIDENAV' });

    expect(newState).toEqual({ ...state, sideNav: { open: true } });
  });
});
