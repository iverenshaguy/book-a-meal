import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import Routes from '../../../src/app/App/Routes';
import authReducer from '../../../src/store/reducers/auth';

describe('Routes', () => {
  let store, history;

  beforeEach(() => {
    store = createStore(combineReducers({
      router: routerReducer,
      auth: authReducer
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

  it('should render signup page', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);
    history.push('/signup?role=customer');

    expect(wrapper.find('Auth')).toBeTruthy();
  });
});
