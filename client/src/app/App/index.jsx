import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../../rootReducer';
import Routes from './Routes';
import '../../../dist/scss/style.scss';
/**
 * Represents the App Component
 * @returns {component} App
 */

const App = () => (
  <ConnectedRouter history={history}>
    <Routes />
  </ConnectedRouter>
);
export default App;
