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
    const dropdownClass = classNames({
      dropdown: true,
      notification: this.props.type === 'notification' || this.props.type === 'admin-notification',
      'card-dropdown': this.props.type === 'card'
    });

    const dropdownContentClass = classNames({
      show: this.state.showContent,
      'dropdown-content': true,
      'admin-dropdown-content': this.props.type === 'admin-notification',
      meal: this.props.type === 'card'
    });

    return (
      <div
        className={dropdownClass}
        onMouseEnter={this.toggleDropdownContent}
        onMouseLeave={this.toggleDropdownContent}
      >
        <LinkBtn clickHandler={this.toggleDropdownContent} id="dropdown-toggler" className="link">
          {this.props.toggler}
        </LinkBtn>
        <div className={dropdownContentClass} id="dropdown-content">{this.props.content}</div>
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
