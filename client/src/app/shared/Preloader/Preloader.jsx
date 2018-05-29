import React from 'react';
import Loader from 'react-loaders';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import 'loaders.css/src/animations/ball-scale-multiple.scss';
import './Preloader.scss';

/**
 * @exports
 * @function Preloader
 * @returns {JSX} Preloader
 */
const Preloader = ({ type }) => {
  const className = classNames({
    'main-preloader': true,
    'user-preloader': type === 'user',
    'admin-preloader': type === 'admin'
  });

  return (
    <div className={className}>
      <Loader type="ball-scale-multiple" />
    </div>
  );
};

Preloader.propTypes = {
  type: PropTypes.string
};

Preloader.defaultProps = {
  type: null
};

export default Preloader;
