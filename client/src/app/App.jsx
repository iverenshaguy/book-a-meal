import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { history } from '../rootReducer';
import { WelcomeComponent as Welcome } from './pages/Welcome';
import '../../public/scss/style.scss';

/**
 * Represents the App Component
 * @returns {component} App
 */
const App = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Welcome} />
    </Switch>
  </ConnectedRouter>
);

export default App;
