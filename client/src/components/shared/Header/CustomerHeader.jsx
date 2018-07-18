import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userPropTypes } from '../../../helpers/proptypes';
import Dropdown from '../Dropdown';


/**
 * @exports
 * @function CustomerHeader
 * @param {object} props
 * @returns {JSX} CustomerHeader
 */
const CustomerHeader = ({ logout, user, active }) => (
  <Fragment>
    <div className="page-title">
      <h3>
        <Link href="/" to="/">BOOK-A-MEAL</Link>
      </h3>
    </div>
    <div className="navlinks">
      <div className="user-info">
        <Dropdown
          type="customer"
          toggler={
            <div className="username-circle circle-click">
              <p className="circle-click">{user.firstname[0]}&#9663;</p>
            </div>
          }
          content={
            <Fragment>
              <Link href="/" to="/" className={`${active === 'menu' && 'active'}`}>Menu</Link>
              <Link href="/orders" to="/orders">Order History</Link>
              <Link href="/" to="/" onClick={logout}>Logout</Link>
            </Fragment>
          }
        />
        <p>&nbsp;&nbsp;{user.firstname}</p>
      </div>
    </div>
  </Fragment>
);

CustomerHeader.propTypes = {
  ...userPropTypes,
  logout: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired
};

export default CustomerHeader;
