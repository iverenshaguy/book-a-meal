import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Auth from './../pages/Auth';
import Welcome from './../pages/Welcome';
import Meals from './../pages/Meals';
import requiresAuthentication from './../hoc/Authentication';
import '../../../dist/scss/style.scss';

/**
 * Represents the Routes Component
 * @returns {component} Routes
 */
const Routes = () => (
  <Fragment>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/meals" component={requiresAuthentication(Meals)} />
    <Route path="/signin" render={props => <Auth {...props} type="signin" />} />
    <Route path="/signup" render={props => <Auth {...props} type="signup" />} />
  </Fragment>
);

export default Routes;
