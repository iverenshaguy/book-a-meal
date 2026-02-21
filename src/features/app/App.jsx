import React, { Fragment } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import ReduxToastr from 'react-redux-toastr';

import { history } from 'src/store/rootReducer';
import Routes from 'src/features/app/Routes';

import 'react-redux-toastr/src/styles/index.scss';
import 'public/scss/style.scss';

/**
 * Represents the app Component
 * @returns {component} app
 */
const App = () => (
  <Fragment>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
    <ReduxToastr timeOut={3000} newestOnTop={false} preventDuplicates transitionIn="bounceIn" transitionOut="fadeOut" />
  </Fragment>
);
export default App;
