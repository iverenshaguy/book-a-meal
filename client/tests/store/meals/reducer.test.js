import reducer from '../../../src/store/reducers/meals';
import { caterersMealsObj, newMeal } from '../../setup/data';

const state = {
  items: [],
  error: null,
  working: false
};

describe('Meals Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle SET_MEAL_WORKING action', () => {
    const newState = reducer(state, {
      type: 'SET_MEAL_WORKING'
    });

    expect(newState).toEqual({ ...state, working: true });
  });

  it('should handle UNSET_MEAL_WORKING action', () => {
    const newState = reducer({ ...state, working: true }, {
      type: 'UNSET_MEAL_WORKING'
    });

    expect(newState).toEqual({ ...state, working: false });
  });

  it('should handle CLEAR_MEAL_ERROR action', () => {
    const newState = reducer({ ...state, error: 'Error' }, {
      type: 'CLEAR_MEAL_ERROR'
    });

    expect(newState).toEqual({ ...state, error: null });
  });

  it('should handle RECEIVE_MEALS_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_MEALS_SUCCESS',
      payload: caterersMealsObj.meals
    });

    expect(newState).toEqual({
      ...state,
      items: caterersMealsObj.meals
    });
  });

  it('should handle RECEIVE_MEALS_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_MEALS_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle ADD_MEAL_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'ADD_MEAL_SUCCESS',
      payload: newMeal
    });

    expect(newState).toEqual({ ...state, items: [...state.items, newMeal] });
  });

  it('should handle ADD_MEAL_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'ADD_MEAL_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });

  it('should handle EDIT_MEAL_SUCCESS action', () => {
    const stateWithMeals = {
      ...state,
      items: [
        ...caterersMealsObj.meals,
        newMeal
      ]
    };
    const editedMeal = { ...newMeal, description: 'Basmati Rice' };
    const newState = reducer(
      { ...stateWithMeals },
      {
        type: 'EDIT_MEAL_SUCCESS',
        payload: editedMeal
      }
    );

    expect(newState).toEqual({
      ...stateWithMeals,
      items: [
        ...stateWithMeals.items.slice(0, 2),
        {
          ...stateWithMeals.items[2],
          ...editedMeal
        }
      ],
    });
  });

  it('should handle EDIT_MEAL_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'EDIT_MEAL_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });
});
