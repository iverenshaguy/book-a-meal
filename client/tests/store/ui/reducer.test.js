import reducer from '../../../src/store/reducers/ui';

const state = {
  modals: {
    isOpen: false,
    type: null
  }
};

describe('UI Reducers', () => {
  it('should return initial state', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle TOGGLE_MODAL action with payload', () => {
    const newState = reducer(
      state,
      {
        type: 'TOGGLE_MODAL',
        payload: 'addMeal'
      }
    );

    expect(newState).toEqual({ ...state, modals: { isOpen: true, type: 'addMeal' } });
  });

  it('should handle TOGGLE_MODAL action with no payload', () => {
    const newState = reducer(
      { ...state, modals: { ...state.modals, isOpen: true } },
      {
        type: 'TOGGLE_MODAL',
        payload: null
      }
    );

    expect(newState).toEqual({ ...state, modals: { ...state.modals, isOpen: false } });
  });
});

