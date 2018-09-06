import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from '../../../containers/shared/Modal';
import Header from '../Header';
import Footer from '../Footer';
import SideNav from '../../../containers/shared/SideNav';
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
    isFetching: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.array,
    ]).isRequired,
    showTime: PropTypes.bool,
    updateCurrentDate: PropTypes.func
  };

  static defaultProps = {
    isFetching: false,
    showTime: true,
    updateCurrentDate: null
  };

  customerOrderTypes = ['orderReview', 'orderConfirm', 'customerOrderDetails'];

  /**
   * @memberof View
   * @returns {JSX} ViewContent Component
   */
  renderContent = () => {
    const { type, user } = this.props;

    const contentClass = classNames({
      'content-wrapper': !this.customerOrderTypes.includes(type),
      dashboard: type === 'dashboard',
      'main-wrapper': this.customerOrderTypes.includes(type)
    });

    const isCustomerMenu = user.role === 'customer' && type === 'menu';

    return (
      <div className={contentClass} id="has-modal">
        {!isCustomerMenu && this.renderNormalContent()}
        {isCustomerMenu && this.renderCustomerMenuContent()}
      </div>
    );
  }


  /**
   * @memberof View
   * @returns {JSX} ViewContent Component
   */
  renderNormalContent = () => {
    const { isFetching, children } = this.props;

    return (
      <Fragment>
        {isFetching && <Preloader />}
        {!isFetching && children}
      </Fragment>
    );
  }

  /**
   * @memberof View
   * @returns {JSX} ViewContent Component
   */
  renderCustomerMenuContent = () => {
    const { isFetching, children } = this.props;

    return (
      <Fragment>
        {React.Children.toArray(children)[0]}
        {isFetching && <Preloader />}
        {!isFetching && React.Children.toArray(children)[1]}
      </Fragment>
    );
  }

  /**
   * @memberof View
   * @returns {JSX} View Component
   */
  render() {
    const {
      user, logout, type, showTime, updateCurrentDate
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
          updateCurrentDate={updateCurrentDate}
        />
        {user.role === 'caterer' &&
          <div className="content">
            <SideNav user={user} logout={logout} active={type} />
            {this.renderContent()}
          </div>}
        {user.role === 'customer' && this.renderContent()}
        <Modal {...this.props} />
        <Footer />
      </div>
    );
  }
}

export default View;
