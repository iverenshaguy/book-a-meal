import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import { userPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @function AuthenticateroleToValidate
 * @param {object} props
 * @return {React.ComponentClass} - MyComponent|Redirect
 */
const AuthenticateRole = (props) => {
  const { children, user, roleToValidate, authenticating } = props;

  if (!roleToValidate) {
    throw new Error('roleToValidate is required');
  }

  return (
    <Fragment>
      {!authenticating && user.role !== roleToValidate && <Redirect to="/" />}
      {!authenticating && user.role === roleToValidate && children(props)}
    </Fragment>
  );
};

AuthenticateRole.propTypes = {
  ...userPropTypes,
  children: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  authenticating: state.auth.loading,
});

export default connect(mapStateToProps)(AuthenticateRole);
