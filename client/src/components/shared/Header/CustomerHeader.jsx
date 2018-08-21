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
const CustomerHeader = ({ logout, user, active }) => {
  const links = (
    <Fragment>
      <Link to="/" className={`${active === 'menu' && 'active'}`}>Menu</Link>
      <Link to="/orders" className={`${(active === 'orders' || active === 'customerOrderDetails') && 'active'}`}>Orders</Link>
      <Link to="/" onClick={logout}>Logout</Link>
    </Fragment>);

  return (
    <Fragment>
      <div className="page-title">
        <h3>
          <Link to="/">BOOK-A-MEAL</Link>
        </h3>
      </div>
      <div className="navlinks">
        <h3>Welcome, {user.firstname}</h3>
        {links}
        <div className="user-info mobile-only">
          <Dropdown
            type="customer"
            toggler={
              <div className="user-dropdown">
                <div className="username-circle circle-click">
                  <p className="circle-click">{user.firstname[0]}</p>
                </div>
                <span>&#9662;</span>
              </div>
          }
            content={links}
          />
          <p>&nbsp;&nbsp;{user.firstname}</p>
        </div>
      </div>
    </Fragment>
  );
};

CustomerHeader.propTypes = {
  ...userPropTypes,
  logout: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired
};

export default CustomerHeader;
