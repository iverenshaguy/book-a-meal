import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ clickHandler, children }) => (
  <button className="link-btn" onClick={clickHandler}>{children}</button>
);

Link.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
};

export default Link;
