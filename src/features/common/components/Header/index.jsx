import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CatererHeader from 'src/features/common/components/Header/CatererHeader';
import CustomerHeader from 'src/features/common/components/Header/CustomerHeader';
import { userPropType } from 'src/features/common/utils/proptypes';
import 'src/features/common/components/Header/Header.scss';

/**
 * @exports
 * @class Header
 * @extends Component
 * @classdesc Creates Header Component
 * @returns {React.ComponentClass} Header Component
 */
class Header extends Component {
  /**
   * Renders the Home Header
   * @memberofHeader
   * @returns {React.ComponentClass}Header Component
   */
  renderUnauthHeader = () => {
    const { type } = this.props;

    return (
      <Fragment>
        <div className="page-title">
          <h3>
            <Link to="/">BOOK-A-MEAL</Link>
          </h3>
        </div>
        {type === 'home' && (
          <div className="navlinks">
            <Link to="/signin" className="link">
              Log In
            </Link>
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </div>
        )}
      </Fragment>
    );
  };

  /**
   * @memberof Header
   * @returns {React.ComponentClass} Header Component
   */
  render() {
    const { type, showTime, dateType, updateCurrentDate } = this.props;
    const unauth = type === 'home' || type === 'unauth';

    const headerClass = classNames({
      header: true,
      homepage: type === 'home',
      unauth: type === 'unauth',
    });

    const navbarClass = classNames({
      navbar: true,
      'unauth-navbar': unauth,
      'white-navbar': type === 'customer',
    });

    return (
      <div className={headerClass}>
        <div className={navbarClass}>
          {unauth && this.renderUnauthHeader()}
          {type === 'caterer' && (
            <CatererHeader dateType={dateType} showTime={showTime} updateCurrentDate={updateCurrentDate} />
          )}
          {type === 'customer' && <CustomerHeader {...this.props} />}
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
  updateCurrentDate: PropTypes.func,
};

Header.defaultProps = {
  user: null,
  type: null,
  showTime: true,
  dateType: null,
  logout: null,
  updateCurrentDate: null,
};

export default Header;
