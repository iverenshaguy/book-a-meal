import React from 'react';
import PropTypes from 'prop-types';
import LinkBtn from '../../shared/Link';
import { userPropType } from '../../../helpers/proptypes';

/**
 * @exports
 * @function SideNav
 * @returns {JSX} SideNav
 */
const SideNav = ({ user, logout }) => (
  <div className="sidenav" id="sidenav">
    <div className="sidenav-content">
      <div className="sidenav-header">
        <div className="close d-none-md">
          <a href="#">&times;</a> {/* eslint-disable-line */}
        </div>
        <div className="sidenav-title">
          <h3>
            <a href="/">BOOK-A-MEAL</a>
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
        <a href="/" className="menu-item active">Dashboard</a>
        <a href="/" className="menu-item">Meals</a>
        <a href="/" className="menu-item">Menu</a>
        <a href="/" className="menu-item">Order History</a>
      </div>
    </div>
  </div>
);

SideNav.propTypes = {
  ...userPropType,
  logout: PropTypes.func.isRequired
};

export default SideNav;
