import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { mealObjPropTypes } from 'src/features/common/utils/proptypes';

import { connect } from 'react-redux';
import { deleteMeal } from 'src/features/meals/data/actions';

import { MiniPreloader } from 'src/features/common/components/Preloader';

/**
 * @exports
 * @extends Component
 * @class DeleteMealModal
 * @param {object} props
 * @returns {React.ComponentClass} DeleteMealModal
 */
export class DeleteMealModal extends Component {
  /**
   * @menberof DeleteMealModal
   * @returns {React.ComponentClass} DeleteMealModal
   */
  toggleModal = () => {
    this.props.toggleModal();
  };

  /**
   * @menberof DeleteMealModal
   * @returns {React.ComponentClass} DeleteMealModal
   */
  handleDeleteClick = () => {
    this.props.deleteMeal(this.props.meal.id);
  };

  /**
   * @menberof DeleteMealModal
   * @returns {React.ComponentClass} DeleteMealModal
   */
  render() {
    return (
      <Fragment>
        {this.props.deleting && (
          <div className="text-center">
            <MiniPreloader />
          </div>
        )}
        {!this.props.deleting && (
          <div className="delete-meal">
            <p>Are You Sure?</p>
            <div className="confirm-delete-btns control-btns">
              <button type="button" className="btn btn-sec" id="confirm-delete-no" onClick={this.toggleModal}>
                No
              </button>
              <button
                type="button"
                className="btn btn-sec-danger"
                id="confirm-delete-yes"
                onClick={this.handleDeleteClick}
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

DeleteMealModal.propTypes = {
  deleteMeal: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  deleting: PropTypes.bool.isRequired,
  meal: mealObjPropTypes,
};

DeleteMealModal.defaultProps = {
  meal: null,
};

const mapStateToProps = (state) => ({
  deleting: state.meals.working,
});

export default connect(mapStateToProps, { deleteMeal })(DeleteMealModal);
