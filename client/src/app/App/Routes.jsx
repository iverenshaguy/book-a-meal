import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { WelcomeComponent as Welcome } from './../pages/Welcome';
import Auth from './../pages/Auth';
import '../../../public/scss/style.scss';

/**
 * Represents the Routes Component
 * @returns {component} Routes
 */
const Routes = () => (
  <Fragment>
    <Route exact path="/" component={Welcome} />
    <Route path="/signin" render={props => <Auth {...props} type="signin" />} />
    <Route path="/signup" render={props => <Auth {...props} type="signup" />} />
  </Fragment>
);

export default Routes;
