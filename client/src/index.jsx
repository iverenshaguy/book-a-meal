import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { AppContainer } from 'react-hot-loader';
import rootReducer, { history } from './reducers/rootReducer';
import refreshPage from './utils/refreshPage';
import App from './components/App';

const enhancers = [];
const middlewares = [thunk, routerMiddleware(history)];


if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);

  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);

const store = createStore(rootReducer, composedEnhancers);

refreshPage(store);

/**
 * @function renderApp
 * @param {elem} Root - App Root
 * @returns {JSX} App Instance
 */
const renderApp = (Root) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Root />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(App);

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}
