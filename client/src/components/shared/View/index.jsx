import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Header from '..//Header';
import Footer from '../Footer';
import SideNav from '../SideNav';
import Preloader from '../Preloader';
import { userPropTypes, } from '../../../helpers/proptypes';
import './View.scss';

/**
 * @exports
 * @class View
 * @desc Creates View Component
 * @returns {JSX} View Component
 */
class View extends Component {
  static propTypes = {
    ...userPropTypes,
    isFetching: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    showTime: PropTypes.bool
  };

  static defaultProps = {
    showTime: true
  };

  customerOrderTypes = ['orderReview', 'orderConfirm', 'customerOrderDetails'];
  /**
   * @memberof View
   * @returns {JSX} ViewContent Component
   */
  renderContent = () => {
    const { type, isFetching, children } = this.props;
    const contentClass = classNames({
      'content-wrapper': !this.customerOrderTypes.includes(type),
      dashboard: type === 'dashboard',
      'main-wrapper': this.customerOrderTypes.includes(type)
    });

    return (
      <div className={contentClass} id="has-modal">
        {isFetching && <Preloader />}
        {!isFetching && children}
      </div>
    );
  }

  /**
   * @memberof View
   * @returns {JSX} View Component
   */
  render() {
    const {
      user, logout, type, showTime
    } = this.props;
    const mainClass = classNames({
      admin: !this.customerOrderTypes.includes(type),
      user: user.role === 'customer'
    });

    return (
      <div className={mainClass}>
        <Header
          type={user.role}
          dateType={type}
          showTime={showTime}
          user={user}
          logout={logout}
          active={type}
        />
        {user.role === 'caterer' &&
          <div className="content">
            <SideNav user={user} logout={logout} active={type} />
            {this.renderContent()}
          </div>}
        {user.role === 'customer' && this.renderContent()}
        <Modal />
        <Footer />
      </div>
    );
  }
}

export default View;
