import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Welcome from 'src/features/welcome';
import AuthenticateRole from 'src/features/auth/hoc/AuthenticateRole';
import AuthenticateUser from 'src/features/auth/hoc/AuthenticateUser';
import Preloader from 'src/features/common/components/Preloader';
import 'public/scss/style.scss';

const NotFound = lazy(() => import(/* webpackChunkName: "AsyncNotFound" */ 'src/features/not-found'));
const Auth = lazy(() => import(/* webpackChunkName: "AsyncAuth" */ 'src/features/auth'));
const Password = lazy(() => import(/* webpackChunkName: "AsyncPassword" */ 'src/features/auth/Password'));
const Meals = lazy(() => import(/* webpackChunkName: "AsyncMeals" */ 'src/features/meals'));
const Menu = lazy(() => import(/* webpackChunkName: "AsyncMenu" */ 'src/features/menu'));
const Orders = lazy(() => import(/* webpackChunkName: "AsyncOrders" */ 'src/features/orders'));
const OrderReview = lazy(
  () => import(/* webpackChunkName: "AsyncOrderReview" */ 'src/features/orders/customer/OrderReview')
);
const OrderDetails = lazy(() => import(/* webpackChunkName: "AsyncOrderDetails" */ 'src/features/order-details'));
const OrderConfirmation = lazy(
  () => import(/* webpackChunkName: "AsyncOrderConfirmation" */ 'src/features/orders/customer/OrderConfirmation')
);

/**
 * Represents the Routes Component
 * @returns {component} Routes
 */
const Routes = () => (
  <Suspense fallback={Preloader}>
    <Switch>
      <Route exact path="/">
        <Welcome />
      </Route>
      <Route exact path="/meals">
        {({ location }) => (
          <AuthenticateRole roleToValidate="caterer">
            {() => <AuthenticateUser location={location}>{(props) => <Meals {...props} />}</AuthenticateUser>}
          </AuthenticateRole>
        )}
      </Route>
      <Route exact path="/menu">
        {({ location }) => <AuthenticateUser location={location}>{(props) => <Menu {...props} />}</AuthenticateUser>}
      </Route>
      <Route exact path="/orders">
        {({ location }) => <AuthenticateUser location={location}>{(props) => <Orders {...props} />}</AuthenticateUser>}
      </Route>
      <Route exact path="/order-review">
        {({ location }) => (
          <AuthenticateRole roleToValidate="customer">
            {() => <AuthenticateUser location={location}>{(props) => <OrderReview {...props} />}</AuthenticateUser>}
          </AuthenticateRole>
        )}
      </Route>
      <Route exact path="/order-confirmation">
        {({ location }) => (
          <AuthenticateRole roleToValidate="customer">
            {() => (
              <AuthenticateUser location={location}>{(props) => <OrderConfirmation {...props} />}</AuthenticateUser>
            )}
          </AuthenticateRole>
        )}
      </Route>
      <Route exact path="/orders/:id">
        {({ location, match }) => (
          <AuthenticateUser location={location} match={match}>
            {(props) => <OrderDetails {...props} />}
          </AuthenticateUser>
        )}
      </Route>
      <Route exact path="/signin">
        {({ location }) => <Auth type="signin" location={location} />}
      </Route>
      <Route exact path="/signup">
        {({ location }) => <Auth type="signup" location={location} />}
      </Route>
      <Route exact path="/forgot-password">
        {({ location }) => <Password type="forgotPassword" location={location} />}
      </Route>
      <Route exact path="/reset-password">
        {({ location }) => <Password type="resetPassword" location={location} />}
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  </Suspense>
);

export default Routes;
