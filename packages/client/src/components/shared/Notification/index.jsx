import React from 'react';
import PropTypes from 'prop-types';
import 'loaders.css/src/animations/ball-scale-multiple.scss';
import './Notification.scss';

/**
 * @exports
 * @function Notification
 * @returns {JSX} Notification
 */
const Notification = ({ message }) => (
  <div className="notification-pill">
    <p className="text-center notif">{message}</p>
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired
};

export default Notification;
