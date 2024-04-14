import React from 'react';
import PropTypes from 'prop-types';
import Form from 'src/features/common/components/Form';
import { mealObjPropTypes } from 'src/features/common/utils/proptypes';

/**
 * @exports
 * @function MealModal
 * @param {object} props
 * @returns {component} MealModal
 */
const MealModal = (props) => {
  const { type } = props;
  const btnText = type === 'addMeal' ? 'ADD MEAL' : 'SAVE MEAL';

  return <Form {...props} type={type} meta={{ btnText }} />;
};

MealModal.propTypes = {
  type: PropTypes.string.isRequired,
  meal: mealObjPropTypes,
};

MealModal.defaultProps = {
  meal: null,
};

export default MealModal;
