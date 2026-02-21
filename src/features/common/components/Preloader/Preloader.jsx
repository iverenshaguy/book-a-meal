import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { RevolvingDot } from 'react-loader-spinner';
import 'src/features/common/components/Preloader/Preloader.scss';

/**
 * @exports
 * @function Preloader
 * @returns {React.ComponentClass} Preloader
 */
const Preloader = ({ type }) => {
  const className = classNames({
    'main-preloader': true,
    'user-preloader': type === 'user',
    'admin-preloader': type === 'admin',
    'menu-preloader': type === 'menu',
  });

  return (
    <div className={className}>
      <RevolvingDot
        visible={true}
        height="80"
        width="80"
        ariaLabel="revolving-dot-loading"
        wrapperStyle={{}}
        wrapperClass="loader"
      />
    </div>
  );
};

Preloader.propTypes = {
  type: PropTypes.string,
};

Preloader.defaultProps = {
  type: null,
};

export default Preloader;
