import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import instance from '../../src/config/axios';
import { mealsObj, customersMenuObj, metadata } from '../setup/mockData';
import {
  addMenu,
  editMenu,
  fetchMenu,
  setCurrentDay,
  clearMenuError,
  addMenuSuccess,
  addMenuFailure,
  editMenuSuccess,
  editMenuFailure,
  setMenuWorking,
  unsetMenuWorking,
  fetchMenuSuccess,
  fetchMenuFailure,
} from '../../src/actions/menu';

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockReq = new MockAdapter(instance);
const newMenu = { date: '2018-06-07', meals: mealsObj.meals };

// configure Mock store
const store = mockStore({
  meals: [],
  error: null,
  metadata: {}
});

describe('Menu Actions', () => {
  test('fetchMenuSuccess', () => {
    const action = fetchMenuSuccess('RECEIVE_MENU_SUCCESS', mealsObj);

    expect(action).toEqual({
      type: 'RECEIVE_MENU_SUCCESS',
      payload: mealsObj
    });
  });

  test('fetchMenuFailure', () => {
    const action = fetchMenuFailure('error');

    expect(action).toEqual({
      type: 'RECEIVE_MENU_FAILURE',
      payload: 'error'
    });
  });

  test('setCurrentDay', () => {
    const action = setCurrentDay('2018-04-25');

    expect(action).toEqual({
      type: 'SET_CURRENT_DAY',
      payload: '2018-04-25'
    });
  });

  test('setMenuWorking', () => {
    const action = setMenuWorking();

    expect(action).toEqual({
      type: 'SET_MENU_WORKING'
    });
  });

  test('unsetMenuWorking', () => {
    const action = unsetMenuWorking();

    expect(action).toEqual({
      type: 'UNSET_MENU_WORKING'
    });
  });

  test('addMenuSuccess', () => {
    const action = addMenuSuccess(newMenu);

    expect(action).toEqual({
      type: 'ADD_MENU_SUCCESS',
      payload: newMenu
    });
  });

  test('addMenuFailure', () => {
    const action = addMenuFailure('error');

    expect(action).toEqual({
      type: 'ADD_MENU_FAILURE',
      payload: 'error'
    });
  });

  test('editMenuSuccess', () => {
    const action = editMenuSuccess(newMenu);

    expect(action).toEqual({
      type: 'EDIT_MENU_SUCCESS',
      payload: newMenu
    });
  });

  test('editMenuFailure', () => {
    const action = editMenuFailure('error');

    expect(action).toEqual({
      type: 'EDIT_MENU_FAILURE',
      payload: 'error'
    });
  });

  test('clearMenuError', () => {
    const action = clearMenuError();

    expect(action).toEqual({
      type: 'CLEAR_MENU_ERROR'
    });
  });

  describe('Menu Operations', () => {
    afterEach(() => {
      store.clearActions();
    });

    describe('Menu', () => {
      it('dispatches SET_FETCHING, RECEIVE_MENU_SUCCESS and UNSET_FETCHING on successful fetching of caterer menu', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_MENU_SUCCESS', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/menu?date=2018-06-07`).reply(200, mealsObj);

        return store.dispatch(fetchMenu('2018-06-07')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_MENU_SUCCESS and UNSET_FETCHING on successful fetching of customer menu with search', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_MENU_SUCCESS', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/menu?date=2018-06-07&search=Rice`).reply(200, customersMenuObj);

        return store.dispatch(fetchMenu('2018-06-07', null, 'Rice')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches RECEIVE_MORE_MENU_SUCCESS and UNSET_FETCHING on successful fetching of customer menu with metadata', () => {
        const expectedActions = ['RECEIVE_MORE_MENU_SUCCESS', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/menu?date=2018-06-07&limit=5`).reply(200, customersMenuObj);

        return store.dispatch(fetchMenu('2018-06-07', { ...metadata, next: '/menu?date=2018-06-07&limit=5' })).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_MENU_FAILURE and UNSET_FETCHING on unsuccessful fetching', () => {
        const expectedActions = ['SET_FETCHING', 'RECEIVE_MENU_FAILURE', 'UNSET_FETCHING'];

        mockReq.onGet(`${url}/menu?date=2018-06-07`).reply(401, { error: 'Error' });

        return store.dispatch(fetchMenu('2018-06-07')).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MENU_WORKING, ADD_MENU_SUCCESS, UNSET_MENU_WORKING and TOGGLE_MODAL on successful meal addition', () => {
        const expectedActions = ['SET_MENU_WORKING', 'ADD_MENU_SUCCESS', 'UNSET_MENU_WORKING', 'TOGGLE_MODAL'];

        mockReq.onPost(`${url}/menu`).reply(200, newMenu);

        return store.dispatch(addMenu(newMenu)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MENU_WORKING, ADD_MENU_FAILURE and UNSET_MENU_WORKING on unsuccessful meal addition', () => {
        const expectedActions = ['SET_MENU_WORKING', 'ADD_MENU_FAILURE', 'UNSET_MENU_WORKING'];

        mockReq.onPost(`${url}/menu`).reply(401, { error: 'Error' });

        return store.dispatch(addMenu(newMenu)).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MENU_WORKING, EDIT_MENU_SUCCESS, UNSET_MENU_WORKING and TOGGLE_MODAL on successful meal addition', () => {
        const expectedActions = ['SET_MENU_WORKING', 'EDIT_MENU_SUCCESS', 'UNSET_MENU_WORKING', 'TOGGLE_MODAL'];

        mockReq.onPut(`${url}/menu/1234`).reply(200, newMenu);

        return store.dispatch(editMenu('1234', newMenu)).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_MENU_WORKING, EDIT_MENU_FAILURE and UNSET_MENU_WORKING on unsuccessful meal addition', () => {
        const expectedActions = ['SET_MENU_WORKING', 'EDIT_MENU_FAILURE', 'UNSET_MENU_WORKING'];

        mockReq.onPut(`${url}/menu/1234`).reply(401, { error: 'Error' });

        return store.dispatch(editMenu('1234', newMenu)).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});
