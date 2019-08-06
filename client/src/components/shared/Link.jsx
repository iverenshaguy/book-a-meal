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
  clickHandler, children, className, id, dataTip
}) => (
  <button
    id={id}
    type="button"
    className={`link-btn ${className}`}
    onClick={clickHandler}
    data-tip={dataTip}
  >
    {children}
  </button>
);

Link.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  clickHandler: PropTypes.func,
  dataTip: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired
};

Link.defaultProps = {
  id: null,
  dataTip: null,
  className: null,
  clickHandler: null
};

export default Link;
