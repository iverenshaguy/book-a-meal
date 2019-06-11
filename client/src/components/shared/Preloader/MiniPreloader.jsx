import React from 'react';
import Loader from 'react-loaders';
import 'loaders.css/src/animations/ball-beat.scss';
import './Preloader.scss';

/**
 * @exports
 * @function MiniPreloader
 * @returns {JSX} MiniPreloader
 */
const MiniPreloader = () => (<Loader type="ball-beat" />);

export default MiniPreloader;
