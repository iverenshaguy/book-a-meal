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
    isOpen: PropTypes.bool.isRequired,
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
    return { bodyStyle: props.isOpen === false ? 'visible' : 'hidden' };
  }

  state = {
    bodyStyle: 'visible'
  }

  /**
     * @memberof Modal
     *@returns {JSX} Modal Component
   */
  render() {
    const { type, isOpen, toggleModal } = this.props;

    document.body.style.overflow = this.state.bodyStyle;

    if (isOpen) {
      return (
        <div className="modal show" id="meal-modal">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 id="modal-title-h3">
                  {type === 'addMeal' && 'Add a Meal'}
                  {type === 'editMeal' && 'Edit Meal'}
                  {type === 'newMealImage' && 'Add a Meal Image'}
                </h3>
              </div>
              <div className="close">
                <LinkBtn aria-hidden="true" id="modal-close-icon" clickHandler={toggleModal}>&times;</LinkBtn>
              </div>
            </div>
            <hr />
            <div className="modal-body">
              {type === 'addMeal' && <MealModal {...this.props} type="addMeal" />}
              {type === 'newMealImage' && <MealImageModal {...this.props} type="newMealImage" />}
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Modal;
