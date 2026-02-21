import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MealModal from 'src/features/common/components/Modal/MealModal';
import MenuModal from 'src/features/common/components/Modal/MenuModal';
import DeleteMealModal from 'src/features/common/components/Modal/DeleteMealModal';
import CloseIcon from 'src/features/common/components/CloseIcon';

import { connect } from 'react-redux';
import { toggleModal } from 'src/features/common/data/actions';

import 'src/features/common/components/Modal/Modal.scss';

/**
 * @exports
 * @class Modal
 * @extends Component
 * @returns {React.ComponentClass} Modal Component
 */
export class Modal extends Component {
  static propTypes = {
    type: PropTypes.string,
    open: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    type: null,
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
    bodyStyle: 'visible',
  };

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
      case 'orderSuccessMsg':
      case 'orderCanceledMsg':
        return null;
      default:
        return null;
    }
  };

  /**
   * @memberof Modal
   * @returns {void}
   */
  handleToggleModalClick = () => this.props.toggleModal();

  /**
   * @memberof Modal
   * @returns {React.ComponentClass} Modal Type Component
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
      case 'orderSuccessMsg':
        return <p className="text-center">Thank you for your order. Your belly will be filled up shortly</p>;
      case 'orderCanceledMsg':
        return <p className="text-center">Order Canceled Successfully</p>;
      case 'deleteSuccessMsg':
        return <p className="text-center">Meal Deleted Successfully</p>;
      default:
        return null;
    }
  };

  /**
   * @memberof Modal
   * @returns {React.ComponentClass} Modal Component
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

const mapStateToProps = (state) => ({
  open: state.ui.modals.open,
  type: state.ui.modals.type,
  submitting: state.meals?.working ?? false,
});

export default connect(mapStateToProps, { toggleModal })(Modal);
