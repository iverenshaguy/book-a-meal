import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'src/features/common/components/Modal';
import SideNav from 'src/features/common/components/SideNav';
import Header from 'src/features/common/components/Header';
import Footer from 'src/features/common/components/Footer';
import Preloader from 'src/features/common/components/Preloader';
import { userPropTypes } from 'src/features/common/utils/proptypes';
import { logout as logoutAction } from 'src/features/auth/data/actions';
import 'src/features/common/components/View/View.scss';

/**
 * @exports
 * @class View
 * @desc Creates View Component
 * @returns {React.ComponentClass} View Component
 */
export class View extends Component {
  static propTypes = {
    ...userPropTypes,
    isFetching: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired,
    showTime: PropTypes.bool,
    updateCurrentDate: PropTypes.func,
  };

  static defaultProps = {
    isFetching: false,
    showTime: true,
    updateCurrentDate: null,
  };

  customerOrderTypes = ['orderReview', 'orderConfirm', 'customerOrderDetails'];

  /**
   * @memberof View
   * @returns {React.ComponentClass} ViewContent Component
   */
  renderContent = () => {
    const { type, isFetching, children } = this.props;
    const contentClass = classNames({
      'content-wrapper': !this.customerOrderTypes.includes(type),
      dashboard: type === 'dashboard',
      'main-wrapper': this.customerOrderTypes.includes(type),
    });

    return (
      <div className={contentClass} id="has-modal">
        {isFetching && <Preloader />}
        {!isFetching && children}
      </div>
    );
  };

  /**
   * @memberof View
   * @returns {React.ComponentClass} View Component
   */
  render() {
    const { user, logout, type, showTime, updateCurrentDate } = this.props;

    const mainClass = classNames({
      admin: !this.customerOrderTypes.includes(type),
      user: user.role === 'customer',
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
        {user.role === 'caterer' && (
          <div className="content">
            <SideNav user={user} logout={logout} active={type} />
            {this.renderContent()}
          </div>
        )}
        {user.role === 'customer' && this.renderContent()}
        <Modal {...this.props} />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.isFetching,
  uploading: state.uploadImage.uploading,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout: logoutAction })(View);
