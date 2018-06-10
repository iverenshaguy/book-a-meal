import React from 'react';
import PropTypes from 'prop-types';
import { RenderFileInput } from '../../FormComponents';

/**
 * @exports
 * @function MealImageModal
 * @param {object} props
 * @returns {component} AddMealImageModal
 */
const MealImageModal = (props) => {
  const {
    formerImgURL, mealId, editMeal, updating
  } = props;

  return (
    <RenderFileInput
      id="imageURL"
      name="imageURL"
      mealId={mealId}
      label="Meal Image"
      updating={updating}
      formerImgURL={formerImgURL}
      successCallBack={imageURL => editMeal(mealId, { imageURL }, true)}
    />
  );
};

MealImageModal.propTypes = {
  formerImgURL: PropTypes.string.isRequired,
  updating: PropTypes.bool.isRequired,
  mealId: PropTypes.string.isRequired,
  editMeal: PropTypes.func.isRequired
};

export default MealImageModal;
