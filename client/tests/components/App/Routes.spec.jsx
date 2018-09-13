import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer } from 'react-router-redux';
import createHistory from 'history/createMemoryHistory';
import Routes from '../../../src/components/App/Routes';
import authReducer from '../../../src/reducers/auth';
import mealsReducer from '../../../src/reducers/meals';

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
    history.push('/signup?role=customer');

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
    history.push('/signup?role=caterer');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render forgot password page', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);
    history.push('/forgot-password');

    expect(wrapper.find('Password')).toBeTruthy();
  });

  it('should render reset password page', () => {
    const comp = (
      <ConnectedRouter store={store} history={history}>
        <Provider store={store}>
          <Routes dispatch={jest.fn()} />
        </Provider>
      </ConnectedRouter>
    );
    const wrapper = mount(comp);
    history.push('/reset-password');

    expect(wrapper.find('Password')).toBeTruthy();
  });
});
