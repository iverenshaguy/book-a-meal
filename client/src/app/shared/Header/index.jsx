import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Header = ({ type }) => {
  const headerClass = classNames({
    header: true,
    homepage: type === 'home',
    unauth: type === 'unauth'
  });

  return (
    <div className={headerClass}>
      <div className="navbar unauth-navbar">
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
      </div>
    </div>
  );
};

Header.propTypes = {
  type: PropTypes.string.isRequired
};

export default Header;
