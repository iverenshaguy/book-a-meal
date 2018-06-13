import React, { Component, Fragment } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CatererHeader from './CatererHeader';

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
   * @memberof Dashboard
   * @returns {JSX} Dashboard Component
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
            <a href="./signin" className="link">Log In</a>
            <a href="./signup" className="link">Sign Up</a>
          </div>}
      </Fragment>
    );
  }
  /**
   * @memberof Header
   * @returns {JSX} Header Component
   */
  render() {
    const { type, date, showTime } = this.props;
    const unauth = type === 'home' || type === 'unauth';

    const headerClass = classNames({
      header: true,
      homepage: type === 'home',
      unauth: type === 'unauth'
    });

    const navbarClass = classNames({
      navbar: true,
      'unauth-navbar': unauth,
    });

    return (
      <div className={headerClass}>
        <div className={navbarClass}>
          {unauth &&
            this.renderUnauthHeader()}
          {type === 'caterer' &&
            <CatererHeader date={date} showTime={showTime} />}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  type: PropTypes.string,
  date: PropTypes.string,
  showTime: PropTypes.bool
};

Header.defaultProps = {
  type: null,
  date: moment().format('dddd[,] Do MMMM YYYY'),
  showTime: true
};

export default Header;
