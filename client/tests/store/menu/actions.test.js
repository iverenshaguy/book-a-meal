import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import MockAdapter from 'axios-mock-adapter';
import instance from '../../../src/config/axios';
import operations from '../../../src/store/operations/menu';
import { caterersMealsObj } from '../../setup/data';

const {
  fetchMenu,
  setCurrentDay,
  fetchMenuSuccess,
  fetchMenuFailure,
} = operations;

const url = '/api/v1';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// configure Mock store
const store = mockStore({
  meals: [],
  error: null
});

describe('Menu Actions', () => {
  test('fetchMenuSuccess', () => {
    const action = fetchMenuSuccess(caterersMealsObj);

    expect(action).toEqual({
      type: 'RECEIVE_MENU_SUCCESS',
      payload: caterersMealsObj
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

  describe('Menu Operations', () => {
    afterEach(() => {
      store.clearActions();
    });

    describe('Menu', () => {
      beforeEach(() => {
        moxios.install(instance);
      });

      afterEach(() => {
        moxios.uninstall(instance);
      });

      it('dispatches SET_FETCHING, RECEIVE_MENU_SUCCESS and UNSET_FETCHING on successful fetching of caterer menu', () => {
        moxios.uninstall(instance);

        const expectedActions = ['SET_FETCHING', 'RECEIVE_MENU_SUCCESS', 'UNSET_FETCHING'];
        const mock = new MockAdapter(instance);

        mock.onGet(`${url}/menu?date=2018-06-07`).reply(200, caterersMealsObj);

        return store.dispatch(fetchMenu('2018-06-07')).then(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);

          expect(actionTypes).toEqual(expectedActions);
        });
      });

      it('dispatches SET_FETCHING, RECEIVE_MENU_FAILURE and UNSET_FETCHING on unsuccessful fetching', () => {
        moxios.uninstall(instance);

        const expectedActions = ['SET_FETCHING', 'RECEIVE_MENU_FAILURE', 'UNSET_FETCHING'];
        const mock = new MockAdapter(instance);

        mock.onGet(`${url}/menu?date=2018-06-07`).reply(401, { error: 'Error' });

        return store.dispatch(fetchMenu('2018-06-07')).catch(() => {
          const dispatchedActions = store.getActions();

          const actionTypes = dispatchedActions.map(action => action.type);


          expect(actionTypes).toEqual(expectedActions);
        });
      });
    });
  });
});
