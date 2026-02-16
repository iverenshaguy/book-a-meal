import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import Preloader from 'src/features/common/components/Preloader';
import { authPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @function AuthenticateUser
 * @param {object} props
 * @return {React.ComponentClass} - MyComponent|Preloader|Redirect
 */
const AuthenticateUser = (props) => {
  const { children, authenticating, isAuthenticated, location } = props;

  return (
    <Fragment>
      {authenticating && <Preloader />}
      {!authenticating && isAuthenticated && children(props)}
      {!authenticating && !isAuthenticated && (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: location },
          }}
        />
      )}
    </Fragment>
  );
};

AuthenticateUser.propTypes = {
  ...authPropTypes,
  authenticating: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  authenticating: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps)(AuthenticateUser);
