/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from './store/configureStore';
import refreshPage from './utils/refreshPage';
import App from './components/App';

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
