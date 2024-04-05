import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Welcome from '../../containers/pages/Welcome';
import checkRole from '../../containers/hoc/checkRole';
import Authenticator from '../../containers/hoc/Authenticator';
import Preloader from '../shared/Preloader';
import '../../../public/scss/style.scss';

const NotFound = lazy(() => import(/* webpackChunkName: "AsyncNotFound" */ '../pages/NotFound'));
const Auth = lazy(() => import(/* webpackChunkName: "AsyncAuth" */ '../../containers/pages/Auth'));
const Password = lazy(() => import(/* webpackChunkName: "AsyncPassword" */ '../../containers/pages/Password'));
const Meals = lazy(() => import(/* webpackChunkName: "AsyncMeals" */ '../../containers/pages/Meals'));
const Menu = lazy(() => import(/* webpackChunkName: "AsyncMenu" */ '../pages/Menu'));
const Orders = lazy(() => import(/* webpackChunkName: "AsyncOrders" */ '../../containers/pages/Orders'));
const OrderReview = lazy(() => import(/* webpackChunkName: "AsyncOrderReview" */ '../pages/Orders/CustomerOrders/OrderReview'));
const OrderDetails = lazy(() => import(/* webpackChunkName: "AsyncOrderDetails" */ '../pages/OrderDetails'));
const OrderConfirmation = lazy(() => import(/* webpackChunkName: "AsyncOrderConfirmation" */ '../../containers/pages/Orders/CustomerOrders/OrderConfirmation'));

/**
 * Represents the Routes Component
 * @returns {component} Routes
 */
const Routes = () => (
  <Suspense fallback={Preloader}>
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
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
