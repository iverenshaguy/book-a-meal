import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import instance from '../../../src/config/axios';
import operations from '../../../src/store/operations/meals';
import { caterersMealsObj, newMeal } from '../../setup/data';

const {
  addMeal,
  editMeal,
  fetchMeals,
  deleteMeal,
  clearMealError,
  addMealSuccess,
  addMealFailure,
  editMealSuccess,
  editMealFailure,
  setMealWorking,
  unsetMealWorking,
  fetchMealsSuccess,
  fetchMealsFailure,
} = operations;

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// configure Mock store
const store = mockStore({
  items: [],
  error: null
});

describe('Meals Actions', () => {
  test('fetchMealsSuccess', () => {
    const action = fetchMealsSuccess(caterersMealsObj);

    expect(action).toEqual({
      type: 'RECEIVE_MEALS_SUCCESS',
      payload: caterersMealsObj
    });
  });

  test('fetchMealsFailure', () => {
    const action = fetchMealsFailure('error');

    expect(action).toEqual({
      type: 'RECEIVE_MEALS_FAILURE',
      payload: 'error'
    });
  });

  test('setMealWorking', () => {
    const action = setMealWorking();

    expect(action).toEqual({
      type: 'SET_MEAL_WORKING'
    });
  });

  test('unsetMealWorking', () => {
    const action = unsetMealWorking();

    expect(action).toEqual({
      type: 'UNSET_MEAL_WORKING'
    });
  });

  test('addMealSuccess', () => {
    const action = addMealSuccess(newMeal);

    expect(action).toEqual({
      type: 'ADD_MEAL_SUCCESS',
      payload: newMeal
    });
  });

  test('addMealFailure', () => {
    const action = addMealFailure('error');

    expect(action).toEqual({
      type: 'ADD_MEAL_FAILURE',
      payload: 'error'
    });
  });

  test('editMealSuccess', () => {
    const action = editMealSuccess({ ...newMeal, description: 'Meal' });

    expect(action).toEqual({
      type: 'EDIT_MEAL_SUCCESS',
      payload: { ...newMeal, description: 'Meal' }
    });
  });

  test('editMealFailure', () => {
    const action = editMealFailure('error');

    expect(action).toEqual({
      type: 'EDIT_MEAL_FAILURE',
      payload: 'error'
    });
  });

  test('clearMealError', () => {
    const action = clearMealError();

    expect(action).toEqual({
      type: 'CLEAR_MEAL_ERROR'
    });
  });

  describe('Meals Operations', () => {
    afterEach(() => {
      store.clearActions();
    });

    describe('Meals', () => {
      beforeEach(() => {
        moxios.install(instance);
      });

      afterEach(() => {
        moxios.uninstall(instance);
      });

      it('dispatches SET_FETCHING, RECEIVE_MEALS_SUCCESS and UNSET_FETCHING on successful fetching of caterer meals', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_MEALS_SUCCESS', 'UNSET_FETCHING'];

        moxios.stubRequest(`${url}/meals`, {
          status: 200,
          response: caterersMealsObj
        });

        return store.dispatch(fetchMeals()).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_MEALS_FAILURE and UNSET_FETCHING on unsuccessful fetching', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_MEALS_FAILURE', 'UNSET_FETCHING'];

        moxios.stubRequest(`${url}/meals`, {
          status: 401,
          response: {
            error: 'Error'
          },
        }, 5);

        return store.dispatch(fetchMeals()).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MEAL_WORKING, ADD_MEAL_SUCCESS, UNSET_MEAL_WORKING and TOGGLE_MODAL on successful meal addition', () => {
        const expectedActions = ['SET_MEAL_WORKING', 'ADD_MEAL_SUCCESS', 'UNSET_MEAL_WORKING', 'TOGGLE_MODAL', 'TOGGLE_MODAL'];

        moxios.stubRequest(`${url}/meals`, {
          status: 200,
          response: caterersMealsObj.meals
        });

        return store.dispatch(addMeal(newMeal)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MEAL_WORKING, ADD_MEAL_SUCCESS and UNSET_MEAL_WORKING on unsuccessful meal addition', () => {
        const expectedActions = ['SET_MEAL_WORKING', 'ADD_MEAL_FAILURE', 'UNSET_MEAL_WORKING'];

        moxios.stubRequest(`${url}/meals`, {
          status: 401,
          response: {
            error: 'Error'
          },
        }, 5);

        return store.dispatch(addMeal(newMeal)).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MEAL_WORKING, EDIT_MEAL_SUCCESS, UNSET_MEAL_WORKING and TOGGLE_MODAL on successful meal edit when toggleEditModal is true', () => {
        const expectedActions = ['SET_MEAL_WORKING', 'EDIT_MEAL_SUCCESS', 'UNSET_MEAL_WORKING', 'TOGGLE_MODAL'];

        moxios.stubRequest(`${url}/meals/${newMeal.id}`, {
          status: 200,
          response: { ...newMeal, price: '2300.00' }
        });

        return store.dispatch(editMeal(newMeal.id, { price: '2300.00' }, true)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MEAL_WORKING, EDIT_MEAL_SUCCESS, UNSET_MEAL_WORKING and TOGGLE_MODAL on successful meal edit when toggleEditModal is false', () => {
        const expectedActions = ['SET_MEAL_WORKING', 'EDIT_MEAL_SUCCESS', 'UNSET_MEAL_WORKING'];

        moxios.stubRequest(`${url}/meals/${newMeal.id}`, {
          status: 200,
          response: { ...newMeal, price: '2300.00' }
        });

        return store.dispatch(editMeal(newMeal.id, { price: '2300.00' }, false)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MEAL_WORKING, EDIT_MEAL_FAILURE and UNSET_MEAL_WORKING on unsuccessful meal edit', () => {
        const expectedActions = ['SET_MEAL_WORKING', 'EDIT_MEAL_FAILURE', 'UNSET_MEAL_WORKING'];

        moxios.stubRequest(`${url}/meals/${newMeal.id}`, {
          status: 401,
          response: {
            error: 'Error'
          },
        });

        return store.dispatch(editMeal(newMeal.id, { price: '2300.00' })).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MEAL_WORKING, DELETE_MEAL_SUCCESS, UNSET_MEAL_WORKING and TOGGLE_MODAL on successful meal delete', () => {
        const expectedActions = ['SET_MEAL_WORKING', 'DELETE_MEAL_SUCCESS', 'UNSET_MEAL_WORKING', 'TOGGLE_MODAL', 'TOGGLE_MODAL', 'TOGGLE_MODAL'];

        moxios.stubRequest(`${url}/meals/${newMeal.id}`, {
          status: 200
        });

        jest.useFakeTimers();

        return store.dispatch(deleteMeal(newMeal.id)).then(() => {
          setTimeout(() => {
            const dispatchedActions = store.getActions();
            const actionTypes = dispatchedActions.map(action => action.type);

            expect(actionTypes).toEqual(expectedActions);
          }, 1000);
        });
      });

      it('dispatches SET_MEAL_WORKING, DELETE_MEAL_FAILURE and UNSET_MEAL_WORKING on unsuccessful meal delete', () => {
        const expectedActions = ['SET_MEAL_WORKING', 'DELETE_MEAL_FAILURE', 'UNSET_MEAL_WORKING'];

        moxios.stubRequest(`${url}/meals/${newMeal.id}`, {
          status: 401,
          response: {
            error: 'Error'
          },
        });

        return store.dispatch(deleteMeal(newMeal.id)).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});
