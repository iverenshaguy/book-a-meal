import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MealModal from './MealModal';
import MenuModal from './MenuModal';
import MealImageModal from './MealImageModal';
import DeleteMealModal from './DeleteMealModal';
import CloseIcon from '../CloseIcon';
import './Modal.scss';

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
      case 'menu':
        return 'Select Meal Options';
      case 'addMeal':
        return 'Add a Meal';
      case 'editMeal':
        return 'Edit Meal';
      case 'deleteMeal':
      case 'deleteSuccessMsg':
        return 'Delete Meal';
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
      case 'menu':
        return <MenuModal />;
      case 'addMeal':
        return <MealModal {...this.props} />;
      case 'editMeal':
        return <MealModal {...this.props} />;
      case 'deleteMeal':
        return <DeleteMealModal {...this.props} />;
      case 'deleteSuccessMsg':
        return <p className="text-center">Meal Deleted Successfully</p>;
      case 'newMealImage':
        return <MealImageModal {...this.props} />;
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
              <CloseIcon btnID="modal-close-icon" clickHandler={this.handleToggleModalClick} />
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
