import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LinkBtn from '../Link';
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
        <a href="/">BOOK-A-MEAL</a>
      </h3>
    </div>
    <div className="navlinks">
      <LinkBtn href="#" className="link">
        <img src="/img/cart.png" alt="cart" />
      </LinkBtn>
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
              <a href="/" className={`${active === 'menu' && 'active'}`}>Menu</a>
              <a href="/">Order History</a>
              <a href="/" onClick={logout}>Logout</a>
            </Fragment>
          }
        />
        <p className="hide d-lg">{user.firstname}</p>
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
