import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Preloader from '../../shared/Preloader';
import { userPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function CustomerView
 * @desc Creates CustomerView Component
 * @returns {JSX} CustomerView Component
 */
const CustomerView = ({
  isFetching, children, user, logout, type
}) => {
  const mainClass = classNames({
    'content-wrapper': true
  });

  return (
    <div className="admin user">
      <Header type="customer" user={user} logout={logout} active={type} />
      <div className="content">
        <div className={mainClass} id="has-modal">
          {isFetching && <Preloader />}
          {!isFetching && children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

CustomerView.propTypes = {
  ...userPropTypes,
  logout: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default CustomerView;
