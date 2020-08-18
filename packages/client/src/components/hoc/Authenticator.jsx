import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Preloader from '../shared/Preloader';
import { authPropTypes } from '../../helpers/proptypes';

/**
 * @function Authenticator
 * @param {object} props
 * @return {JSX} - MyComponent|Preloader|Redirect
 */
const Authenticator = (props) => {
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
      {!authenticating && !isAuthenticated && (
      <Redirect
        to={{
          pathname: '/signin',
          state: { from: location }
        }}
      />
      )}
    </Fragment>
  );
};

Authenticator.propTypes = {
  ...authPropTypes,
  authenticating: PropTypes.bool.isRequired,
  MyComponent: PropTypes.func.isRequired
};

export default Authenticator;
