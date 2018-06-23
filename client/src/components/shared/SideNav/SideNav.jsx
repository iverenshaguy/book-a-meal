import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LinkBtn from '../Link';
import CloseIcon from '../CloseIcon';
import { userPropTypes } from '../../../helpers/proptypes';
import './SideNav.scss';

/**
 * @exports
 * @function SideNav
 * @returns {JSX} SideNav
 */
class SideNav extends Component {
  static propTypes = {
    ...userPropTypes,
    logout: PropTypes.func.isRequired,
    active: PropTypes.string.isRequired
  };

  /**
   * @memberof SideNav
   * @returns {nothing} nothing
   */
  handleToggleSideNavClick = () => this.props.toggleSideNav()

  /**
   * @memberof SideNav
   * @returns {JSX} NavLinks
  */
  renderNavLinks = () => {
    const { active } = this.props;

    return (
      <div className="sidenav-body">
        <Link href="/" to="/" className={`menu-item ${active === 'dashboard' && 'active'}`}>Dashboard</Link>
        <Link href="/meals" to="/meals" className={`menu-item ${active === 'meals' && 'active'}`}>Meals</Link>
        <Link href="/menu" to="/menu" className={`menu-item ${active === 'menu' && 'active'}`}>Menu</Link>
        <Link href="/orders" to="/orders" className={`menu-item ${active === 'orders' && 'active'}`}>Orders</Link>
      </div>
    );
  }

  /**
   * @memberof SideNav
   * @returns {JSX} SideNav Component
  */
  render() {
    const { user, logout, open } = this.props;

    return (
      <div className={`sidenav ${open ? 'show' : null}`} id="sidenav">
        <div className="sidenav-content">
          <div className="sidenav-header">
            <CloseIcon divClass="d-none-md" clickHandler={this.handleToggleSideNavClick} />
            <div className="sidenav-title">
              <h3><Link href="/" to="/">BOOK-A-MEAL</Link></h3>
              <div className="username-circle"><p>{user.businessName.substring(0, 1)}</p></div>
              <p>{user.businessName}</p>
              <span><LinkBtn clickHandler={logout}>Logout</LinkBtn></span>
            </div>
          </div>
          {this.renderNavLinks()}
        </div>
      </div>
    );
  }
}

export default SideNav;
