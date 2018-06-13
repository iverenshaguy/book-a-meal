import reducer from '../../../src/store/reducers/menu';
import { caterersMealsObj } from '../../setup/data';

const state = {
  meals: [],
  error: null,
  working: false
};

describe('Menu Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle RECEIVE_MENU_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_MENU_SUCCESS',
      payload: caterersMealsObj
    });

    expect(newState).toEqual({
      ...state,
      meals: caterersMealsObj.meals
    });
  });

  it('should handle RECEIVE_MENU_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_MENU_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });
});
