import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import SideNav from '../../shared/SideNav';
import Preloader from '../../shared/Preloader';
import { userPropTypes, } from '../../../helpers/proptypes';
import './View.scss';

/**
 * @exports
 * @function View
 * @desc Creates View Component
 * @returns {JSX} View Component
 */
const View = ({
  user, logout, type, isFetching, children, showTime
}) => {
  const mainClass = classNames({ 'content-wrapper': true, dashboard: type === 'dashboard' });

  return (
    <div className={`admin ${user.role === 'customer' ? 'user' : null}`}>
      <Header
        type={user.role}
        dateType={type}
        showTime={showTime}
        user={user}
        logout={logout}
        active={type}
      />
      <div className="content">
        {user.role === 'caterer' && <SideNav user={user} logout={logout} active={type} />}
        <div className={mainClass} id="has-modal">
          {isFetching && <Preloader />}
          {!isFetching && children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

View.propTypes = {
  ...userPropTypes,
  isFetching: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  showTime: PropTypes.bool
};

View.defaultProps = {
  showTime: true
};

export default View;
