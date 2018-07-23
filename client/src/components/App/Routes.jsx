import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './../pages/NotFound';
import Auth from './../pages/Auth';
import Welcome from './../pages/Welcome';
import Meals from './../pages/Meals';
import Menu from './../pages/Menu';
import requiresAuthentication from './../hoc/Authentication';
import Orders from './../pages/Orders';
import OrderReview from '../pages/Orders/CustomerOrders/OrderReview';
import OrderDetails from './../pages/OrderDetails';
import OrderConfirmation from '../pages/Orders/CustomerOrders/OrderConfirmation';
import '../../../public/scss/style.scss';

/**
 * Represents the Routes Component
 * @returns {component} Routes
 */
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/meals" component={requiresAuthentication(Meals)} />
    <Route exact path="/menu" component={requiresAuthentication(Menu)} />
    <Route exact path="/orders" component={requiresAuthentication(Orders)} />
    <Route exact path="/order-review" component={requiresAuthentication(OrderReview)} />
    <Route exact path="/order-confirmation" component={requiresAuthentication(OrderConfirmation)} />
    <Route exact path="/orders/:id" component={requiresAuthentication(OrderDetails)} />
    <Route exact path="/signin" render={props => <Auth {...props} type="signin" />} />
    <Route exact path="/signup" render={props => <Auth {...props} type="signup" />} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default Routes;
