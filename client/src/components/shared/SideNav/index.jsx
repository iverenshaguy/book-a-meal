import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkBtn from '../Link';
import { userPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function SideNav
 * @returns {JSX} SideNav
 */
const SideNav = ({ user, logout, active }) => (
  <div className="sidenav" id="sidenav">
    <div className="sidenav-content">
      <div className="sidenav-header">
        <div className="close d-none-md">
          <a href="#">&times;</a> {/* eslint-disable-line */}
        </div>
        <div className="sidenav-title">
          <h3>
            <Link href="/" to="/">BOOK-A-MEAL</Link>
          </h3>
          <div className="username-circle">
            <p>{user.businessName.substring(0, 1)}</p>
          </div>
          <p>{user.businessName}</p>
          <span>
            <LinkBtn clickHandler={logout}>Logout</LinkBtn>
          </span>
        </div>
      </div>
      <div className="sidenav-body">
        <Link href="/" to="/" className={`menu-item ${active === 'dashboard' && 'active'}`}>Dashboard</Link>
        <Link href="/meals" to="/meals" className={`menu-item ${active === 'meals' && 'active'}`}>Meals</Link>
        <Link href="/menu" to="/menu" className={`menu-item ${active === 'menu' && 'active'}`}>Menu</Link>
        <Link href="/orders" to="/orders" className={`menu-item ${active === 'orders' && 'active'}`}>Orders</Link>
      </div>
    </div>
  </div>
);

SideNav.propTypes = {
  ...userPropTypes,
  logout: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired
};

export default SideNav;
