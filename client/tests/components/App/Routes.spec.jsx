import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import Routes from '../../../src/components/App/Routes';
import authReducer from '../../../src/store/reducers/auth';
import mealsReducer from '../../../src/store/reducers/meals';

describe('Routes', () => {
  let store, history;

  beforeEach(() => {
    store = createStore(combineReducers({
      router: routerReducer,
      auth: authReducer,
      meals: mealsReducer
    }));

    history = createHistory();
  });

  it('should render welcomepage', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);

    expect(wrapper.find('Welcome')).toBeTruthy();
  });

  it('should render signin page', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);
    history.push('/signin');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render default signup page', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);
    history.push('/signup');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render customer signup page', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);
    history.push('/signup/customer');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render caterer signup page', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);
    history.push('/signup/caterer');

    expect(wrapper.find('Auth')).toBeTruthy();
  });
});
