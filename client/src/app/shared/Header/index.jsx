import React, { Component, Fragment } from 'react';
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
    const { type } = this.props;
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
          <CatererHeader />}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  type: PropTypes.string
};

Header.defaultProps = {
  type: null
};

export default Header;
