import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Preloader from '../shared/Preloader';
import { authPropTypes } from '../../helpers/proptypes';

/**
 * @function AuthenticatedComponent
 * @return {Component} - MyComponent
 * @param {object} props
 */
const AuthenticatedComponent = (props) => {
  const {
    MyComponent,
    authenticating,
    isAuthenticated,
    location
  } = props;

  return (
    <Fragment>
      {authenticating && <Preloader />}
      {!authenticating && isAuthenticated && <MyComponent {...props} />}
      {!authenticating && !isAuthenticated && <Redirect
        to={{
          pathname: '/signin',
          state: { from: location }
        }}
      />}
    </Fragment>
  );
};

AuthenticatedComponent.propTypes = {
  ...authPropTypes,
  authenticating: PropTypes.bool.isRequired,
  MyComponent: PropTypes.func.isRequired
};

const requireAuthentication = (MyComponent) => {
  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    authenticating: state.auth.loading,
    MyComponent
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
};

export default requireAuthentication;
