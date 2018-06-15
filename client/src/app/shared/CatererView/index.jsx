import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import SideNav from '../../shared/SideNav';
import Preloader from '../../shared/Preloader';
import { userPropTypes, } from '../../../helpers/proptypes';

/**
 * @exports
 * @function CatererView
 * @desc Creates CatererView Component
 * @returns {JSX} CatererView Component
 */
const CatererView = ({
  user, logout, type, isFetching, children, showTime
}) => {
  const mainClass = classNames({
    'content-wrapper': true,
    dashboard: type === 'dashboard'
  });

  return (
    <div className="admin">
      <Header type="caterer" dateType={type} showTime={showTime} />
      <div className="content">
        <SideNav user={user} logout={logout} active={type} />
        <div className={mainClass} id="has-modal">
          {isFetching && <Preloader />}
          {!isFetching && children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

CatererView.propTypes = {
  ...userPropTypes,
  isFetching: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  showTime: PropTypes.bool.isRequired
};

export default CatererView;
