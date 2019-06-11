import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { mealObjPropTypes } from '../../../helpers/proptypes';
import { MiniPreloader } from '../Preloader';

/**
 * @exports
 * @extends Component
 * @class DeleteMealModal
 * @param {object} props
 * @returns {JSX} DeleteMealModal
 */
class DeleteMealModal extends Component {
  /**
   * @menberof DeleteMealModal
   * @returns {JSX} DeleteMealModal
   */
  toggleModal = () => {
    this.props.toggleModal();
  }

  /**
   * @menberof DeleteMealModal
   * @returns {JSX} DeleteMealModal
   */
  handleDeleteClick = () => {
    this.props.deleteMeal(this.props.meal.id);
  }

  /**
   * @menberof DeleteMealModal
   * @returns {JSX} DeleteMealModal
   */
  render() {
    return (
      <Fragment>
        {this.props.deleting && <div className="text-center"><MiniPreloader /></div>}
        {!this.props.deleting &&
          <div className="delete-meal">
            <p>Are You Sure?</p>
            <div className="confirm-delete-btns control-btns">
              <button
                className="btn btn-sec"
                id="confirm-delete-no"
                onClick={this.toggleModal}
              >No
              </button>
              <button
                className="btn btn-sec-danger"
                id="confirm-delete-yes"
                onClick={this.handleDeleteClick}
              >Yes
              </button>
            </div>
          </div>}
      </Fragment>
    );
  }
}

DeleteMealModal.propTypes = {
  deleteMeal: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
  meal: mealObjPropTypes
};

DeleteMealModal.defaultProps = {
  meal: null
};

export default DeleteMealModal;
