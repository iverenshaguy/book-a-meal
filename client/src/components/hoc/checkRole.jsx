import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { userPropTypes } from '../../helpers/proptypes';

/**
 * @function checkRole
 * @param {object} props
 * @return {JSX} - MyComponent|Redirect
 */
const checkRole = (props) => {
  const { MyComponent, user, role } = props;

  return (
    <Fragment>
      {user.role !== role && <Redirect to="/" />}
      {user.role === role && <MyComponent {...props} />}
    </Fragment>
  );
};

checkRole.propTypes = {
  ...userPropTypes,
  MyComponent: PropTypes.func.isRequired
};

export default checkRole;
