import moment from 'moment';
import reducer from '../../../src/store/reducers/menu';
import { caterersMealsObj } from '../../setup/data';

const state = {
  id: null,
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

  it('should handle SET_MENU_WORKING action', () => {
    const newState = reducer(state, {
      type: 'SET_MENU_WORKING'
    });

    expect(newState).toEqual({ ...state, working: true });
  });

  it('should handle UNSET_MENU_WORKING action', () => {
    const newState = reducer({ ...state, working: true }, {
      type: 'UNSET_MENU_WORKING'
    });

    expect(newState).toEqual({ ...state, working: false });
  });

  it('should handle CLEAR_MENU_ERROR action', () => {
    const newState = reducer({ ...state, error: 'Error' }, {
      type: 'CLEAR_MENU_ERROR'
    });

    expect(newState).toEqual({ ...state, error: null });
  });

  it('should handle RECEIVE_MENU_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_MENU_SUCCESS',
      payload: { id: '1234', meals: caterersMealsObj.meals, date: moment().format('YYYY-MM-DD') }
    });

    expect(newState).toEqual({
      ...state,
      id: '1234',
      meals: caterersMealsObj.meals,
      currentDay: moment().format('YYYY-MM-DD')
    });
  });

  it('should handle RECEIVE_MENU_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_MENU_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle ADD_MENU_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'ADD_MENU_SUCCESS',
      payload: { id: '1234', meals: caterersMealsObj.meals, date: moment().format('YYYY-MM-DD') }
    });

    expect(newState).toEqual({
      ...state,
      id: '1234',
      meals: caterersMealsObj.meals,
      currentDay: moment().format('YYYY-MM-DD')
    });
  });

  it('should handle ADD_MENU_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'ADD_MENU_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle EDIT_MENU_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'EDIT_MENU_SUCCESS',
      payload: { id: '1234', meals: caterersMealsObj.meals, date: moment().format('YYYY-MM-DD') }
    });

    expect(newState).toEqual({
      ...state,
      id: '1234',
      meals: caterersMealsObj.meals,
      currentDay: moment().format('YYYY-MM-DD')
    });
  });

  it('should handle EDIT_MENU_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'EDIT_MENU_FAILURE',
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
