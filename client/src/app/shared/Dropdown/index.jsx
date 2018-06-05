import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import LinkBtn from '../Link';

/**
 * @exports
 * @class Dropdown
 * @extends Component
 * @classdesc Creates Dropdown Component
 * @returns {JSX} Dropdown Component
 */
class Dropdown extends Component {
  /**
   * @constructor
   * @returns {JSX} Dropdown
   */
  constructor() {
    super();

    this.state = {
      showContent: false
    };
  }

  /**
   * @memberof Dropdown
   * @returns {noting} nothing
   */
  toggleDropdownContent = () => {
    this.setState({
      showContent: !this.state.showContent
    });
  }

  /**
   * @memberof Dropdown
   * @returns {JSX} Dropdown Component
   */
  render() {
    const { type, toggler, content } = this.props;
    const { showContent } = this.state;

    const dropdownClass = classNames({
      dropdown: true,
      notification: type === 'notification' || type === 'admin-notification',
      'card-dropdown': type === 'card'
    });

    const dropdownContentClass = classNames({
      show: showContent,
      'dropdown-content': true,
      'admin-dropdown-content': type === 'admin-notification',
      meal: type === 'card'
    });

    return (
      <div
        className={dropdownClass}
        onMouseEnter={this.toggleDropdownContent}
        onMouseLeave={this.toggleDropdownContent}
      >
        <LinkBtn
          clickHandler={this.toggleDropdownContent}
          id="dropdown-toggler"
          className="link"
        >
          {toggler}
        </LinkBtn>
        <div className={dropdownContentClass} id="dropdown-content">
          {content}
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  type: PropTypes.string.isRequired,
  toggler: PropTypes.element.isRequired,
  content: PropTypes.element.isRequired,
};

export default Dropdown;
