import moment from 'moment';
import reducer from '../../../src/store/reducers/menu';
import { caterersMealsObj } from '../../setup/data';

const state = {
  meals: [],
  error: null,
  working: false,
  currentDay: moment().format('YYYY-MM-DD')
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

  it('should handle SET_CURRENT_DAY action', () => {
    const newState = reducer(state, {
      type: 'SET_CURRENT_DAY',
      payload: '2018-04-25'
    });

    expect(newState).toEqual({
      ...state,
      currentDay: '2018-04-25'
    });
  });
});
