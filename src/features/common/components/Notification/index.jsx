import React from 'react';
import PropTypes from 'prop-types';
import 'src/features/common/components/Notification/Notification.scss';

/**
 * @exports
 * @function Notification
 * @returns {React.ComponentClass} Notification
 */
const Notification = ({ message }) => (
  <div className="notification-pill">
    <p className="text-center notif">{message}</p>
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
