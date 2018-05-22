import React from 'react';

const Header = () => (
  <div className="header homepage">
    <div className="navbar unauth-navbar">
      <div className="page-title">
        <h3>
          <a href="/">BOOK-A-MEAL</a>
        </h3>
      </div>
      <div className="navlinks">
        <a href="./login.html" className="link">Log In</a>
        <a href="./signup.html" className="link">Sign Up</a>
      </div>
    </div>
  </div>
);

export default Header;
