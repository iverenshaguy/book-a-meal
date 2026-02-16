import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

import './Preloader.scss';

/**
 * @exports
 * @function MiniPreloader
 * @returns {React.ComponentClass} MiniPreloader
 */
const MiniPreloader = () => (
  <ThreeDots
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass="mini-loader"
  />
);

export default MiniPreloader;
