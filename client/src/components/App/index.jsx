import React, { Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/src/styles/index.scss';
import { history } from '../../rootReducer';
import Routes from './Routes';
import '../../../public/scss/style.scss';

/**
 * Represents the App Component
 * @returns {component} App
 */
const App = () => (
  <Fragment>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
    />
  </Fragment>
);
export default App;
