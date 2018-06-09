import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MealModal from './MealModal';
import MealImageModal from './MealImageModal';
import LinkBtn from '../Link';

/**
 * @exports
 * @class Modal
 * @extends Component
 * @returns {JSX} Modal Component
 */
class Modal extends Component {
  static propTypes = {
    type: PropTypes.string,
    open: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
  };

  static defaultProps = {
    type: null
  };

  /**
   * @memberof Modal
   * @param {object} props
   * @returns {null} null
   */
  static getDerivedStateFromProps(props) {
    return { bodyStyle: props.open === false ? 'visible' : 'hidden' };
  }

  state = {
    bodyStyle: 'visible'
  }

  /**
    * @memberof Modal
    * @returns {string} Modal Title
   */
  getModalTitle = () => {
    const { type } = this.props;

    switch (type) {
      case 'addMeal':
        return 'Add a Meal';
      case 'newMealImage':
        return 'Add a Meal Image';
      default:
        return null;
    }
  }

  /**
   * @memberof Modal
   * @returns {nothing} nothing
   */
  handleToggleModalClick = () => this.props.toggleModal()

  /**
    * @memberof Modal
    * @returns {JSX} Modal Type Component
   */
  renderModalType = () => {
    const { type } = this.props;

    switch (type) {
      case 'addMeal':
        return <MealModal {...this.props} type="addMeal" />;
      case 'newMealImage':
        return <MealImageModal {...this.props} type="newMealImage" />;
      default:
        return null;
    }
  }

  /**
    * @memberof Modal
    * @returns {JSX} Modal Component
   */
  render() {
    const { open } = this.props;

    document.body.style.overflow = this.state.bodyStyle;

    if (open) {
      return (
        <div className="modal show" id="meal-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 id="modal-title-h3">{this.getModalTitle()}</h3>
              </div>
              <div className="close">
                <LinkBtn aria-hidden="true" id="modal-close-icon" clickHandler={this.handleToggleModalClick}>&times;</LinkBtn>
              </div>
            </div>
            <hr />
            <div className="modal-body">{this.renderModalType()}</div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Modal;
