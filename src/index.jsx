/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from 'src/store/configureStore';
import refreshPage from 'src/features/common/utils/refreshPage';
import App from 'src/features/app/App';

refreshPage(store);

/**
 * @function renderApp
 * @param {JSXElement} Root - app Root
 * @returns {React.ComponentClass} app Instance
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

if (module.hot) {
  module.hot.accept('src/features/app/App', () => {
    renderApp(App);
  });
}
