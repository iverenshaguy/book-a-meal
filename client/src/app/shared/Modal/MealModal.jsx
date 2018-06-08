import React from 'react';
import PropTypes from 'prop-types';
import Form from '../Form';
import { mealObjPropTypes } from '../../../helpers/proptypes';

/**
 * @exports
 * @function MealModal
 * @param {object} props
 * @returns {component} AddMealModal
 */
const MealModal = (props) => {
  const { type } = props;
  return <Form {...props} type={type} meta={{ btnText: 'ADD MEAL' }} />;
};

MealModal.propTypes = {
  type: PropTypes.string.isRequired,
  meal: mealObjPropTypes
};

MealModal.defaultProps = {
  meal: null
};

export default MealModal;
