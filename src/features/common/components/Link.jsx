import React from 'react';
import PropTypes from 'prop-types';

/**
 * @exports
 * @function Link
 * @param {function} clickHandler
 * @param {(string|JSX)} children
 * @param {string} className
 * @returns {React.ComponentClass} Link
 */
const Link = ({ clickHandler, children, className, id, ...props }) => (
  <button id={id} type="button" className={`link-btn ${className}`} onClick={clickHandler} {...props}>
    {children}
  </button>
);

Link.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  clickHandler: PropTypes.func,
  'data-tooltip-id': PropTypes.string,
  'data-tooltip-content': PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};

Link.defaultProps = {
  id: null,
  className: null,
  clickHandler: null,
  'data-tooltip-id': null,
  'data-tooltip-content': null,
};

export default Link;
