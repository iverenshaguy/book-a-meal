import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Auth from './../pages/Auth';
import Welcome from './../pages/Welcome';
import Meals from './../pages/Meals';
import Menu from './../pages/Menu';
import CatererOrders from './../pages/Orders/CatererOrders';
import CatererOrderDetails from './../pages/OrderDetails/CatererOrderDetails';
import requiresAuthentication from './../hoc/Authentication';
import '../../../public/scss/style.scss';

/**
 * Represents the Routes Component
 * @returns {component} Routes
 */
const Routes = () => (
  <Fragment>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/meals" component={requiresAuthentication(Meals)} />
    <Route exact path="/menu" component={requiresAuthentication(Menu)} />
    <Route exact path="/orders" component={requiresAuthentication(CatererOrders)} />
    <Route path="/orders/:id" component={requiresAuthentication(CatererOrderDetails)} />
    <Route path="/signin" render={props => <Auth {...props} type="signin" />} />
    <Route path="/signup" render={props => <Auth {...props} type="signup" />} />
  </Fragment>
);

export default Routes;
