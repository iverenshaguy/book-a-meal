import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import Routes from '../../../src/components/App/Routes';
import authReducer from '../../../src/reducers/auth';
import mealsReducer from '../../../src/reducers/meals';

describe('Routes', () => {
  let wrapper;

  const history = createMemoryHistory();

  const store = createStore(combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    meals: mealsReducer
  }));

  const comp = (
    <Provider store={store}>
      <ConnectedRouter store={store} history={history}>
        <Routes dispatch={jest.fn()} />
      </ConnectedRouter>
    </Provider>
  );

  beforeEach(() => {
    wrapper = mount(comp);
  });

  it('should render welcomepage', () => {
    expect(wrapper.find('Welcome')).toBeTruthy();
  });

  it('should render signin page', () => {
    history.push('/signin');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render default signup page', () => {
    history.push('/signup');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render customer signup page', () => {
    history.push('/signup?role=customer');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render caterer signup page', () => {
    history.push('/signup?role=caterer');

    expect(wrapper.find('Auth')).toBeTruthy();
  });

  it('should render forgot password page', () => {
    history.push('/forgot-password');

    expect(wrapper.find('Password')).toBeTruthy();
  });

  it('should render reset password page', () => {
    history.push('/reset-password');

    expect(wrapper.find('Password')).toBeTruthy();
  });

  it('should render a not found page for a wrong route', () => {
    history.push('/notfoundo');

    expect(wrapper.find('NotFound')).toBeTruthy();
  });
});
