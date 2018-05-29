import React from 'react';
import PropTypes from 'prop-types';

/**
 * @exports
 * @function Link
 * @param {function} clickHandler
 * @param {(string|JSX)} children
 * @param {string} className
 * @returns {JSX} Link
 */
const Link = ({
  clickHandler, children, className, id
}) => (
  <button
    id={id}
    className={`link-btn ${className}`}
    onClick={clickHandler}
  >
    {children}
  </button>
);

Link.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
};

Link.defaultProps = {
  id: null,
  className: null
};

export default Link;
