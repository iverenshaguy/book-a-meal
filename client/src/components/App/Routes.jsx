import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import Auth from '../../containers/pages/Auth';
import Password from '../../containers/pages/Password';
import Welcome from '../../containers/pages/Welcome';
import Meals from '../../containers/pages/Meals';
import Menu from '../pages/Menu';
import checkRole from '../../containers/hoc/checkRole';
import Authenticator from '../../containers/hoc/Authenticator';
import Orders from '../../containers/pages/Orders';
import OrderReview from '../pages/Orders/CustomerOrders/OrderReview';
import OrderDetails from '../pages/OrderDetails';
import OrderConfirmation from '../../containers/pages/Orders/CustomerOrders/OrderConfirmation';
import '../../../public/scss/style.scss';

/**
 * Represents the Routes Component
 * @returns {component} Routes
 */
const Routes = () => (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/meals" component={checkRole('caterer')(Authenticator(Meals))} />
    <Route exact path="/menu" component={Authenticator(Menu)} />
    <Route exact path="/orders" component={Authenticator(Orders)} />
    <Route exact path="/order-review" component={checkRole('customer')(Authenticator(OrderReview))} />
    <Route exact path="/order-confirmation" component={checkRole('customer')(Authenticator(OrderConfirmation))} />
    <Route exact path="/orders/:id" component={Authenticator(OrderDetails)} />
    <Route exact path="/signin" render={props => <Auth {...props} type="signin" />} />
    <Route exact path="/signup" render={props => <Auth {...props} type="signup" />} />
    <Route exact path="/forgot-password" render={props => <Password {...props} type="forgotPassword" />} />
    <Route exact path="/reset-password" render={props => <Password {...props} type="resetPassword" />} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default Routes;
