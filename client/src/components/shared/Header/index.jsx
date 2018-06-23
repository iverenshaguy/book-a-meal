import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CatererHeader from './CatererHeader';
import CustomerHeader from './CustomerHeader';
import { userPropType } from '../../../helpers/proptypes';
import './Header.scss';

/**
 * @exports
 * @class Header
 * @extends Component
 * @classdesc Creates Header Component
 * @returns {JSX} Header Component
 */
class Header extends Component {
  /**
   * Renders the Home Header
   * @memberofHeader
   * @returns {JSX}Header Component
   */
  renderUnauthHeader = () => {
    const { type } = this.props;

    return (
      <Fragment>
        <div className="page-title">
          <h3>
            <a href="/">BOOK-A-MEAL</a>
          </h3>
        </div>
        {type === 'home' &&
          <div className="navlinks">
            <Link href="/signin" to="/signin" className="link">Log In</Link>
            <Link href="/signup" to="/signup" className="link">Sign Up</Link>
          </div>}
      </Fragment>
    );
  }
  /**
   * @memberof Header
   * @returns {JSX} Header Component
   */
  render() {
    const { type, showTime, dateType } = this.props;
    const unauth = type === 'home' || type === 'unauth';

    const headerClass = classNames({
      header: true,
      homepage: type === 'home',
      unauth: type === 'unauth'
    });

    const navbarClass = classNames({
      navbar: true,
      'unauth-navbar': unauth,
      'white-navbar': type === 'customer'
    });

    return (
      <div className={headerClass}>
        <div className={navbarClass}>
          {unauth &&
            this.renderUnauthHeader()}
          {type === 'caterer' &&
            <CatererHeader dateType={dateType} showTime={showTime} />}
          {type === 'customer' &&
            <CustomerHeader {...this.props} />}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: userPropType,
  type: PropTypes.string,
  showTime: PropTypes.bool,
  dateType: PropTypes.string,
  logout: PropTypes.func,
};

Header.defaultProps = {
  user: null,
  type: null,
  showTime: true,
  dateType: null,
  logout: null
};

export default Header;
