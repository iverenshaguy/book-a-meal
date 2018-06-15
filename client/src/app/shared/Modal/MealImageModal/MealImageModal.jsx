import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RenderFileInput } from '../../FormComponents';

/**
 * @exports
 * @class MealImageModal
 * @extends Component
 * @returns {JSX} MealImageModal
 */
class MealImageModal extends Component {
  /**
   * @memberof MealImageModal
   * @param {string} imageURL
   * @returns {JSX} MealImageModal
   */
  updateMealImage = imageURL => this.props.editMeal(this.props.mealId, { imageURL }, true);

  /**
   * @memberof MealImageModal
   * @returns {JSX} MealImageModal
   */
  render() {
    const { formerImgURL, mealId, updating } = this.props;

    return (
      <RenderFileInput
        id="imageURL"
        name="imageURL"
        mealId={mealId}
        label="Meal Image"
        updating={updating}
        formerImgURL={formerImgURL}
        successCallBack={this.updateMealImage}
      />
    );
  }
}

MealImageModal.propTypes = {
  formerImgURL: PropTypes.string.isRequired,
  updating: PropTypes.bool.isRequired,
  mealId: PropTypes.string.isRequired,
  editMeal: PropTypes.func.isRequired
};

export default MealImageModal;
