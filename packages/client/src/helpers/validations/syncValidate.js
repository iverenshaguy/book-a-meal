import { isRequired, isValidPasswordConfirm } from './validationTypes';
import validation from './validation';

/**
 * sync Validate supplied field
 * @function syncValidate
 * @param {string} type - validation actionTypes
 * @param {string} field - field to test
 * @param {object} values - all field values
 * @returns {string} field Error
 */
const syncValidate = type => (field, values) => {
  const value = values[field];
  const actionTypes = validation[type][field];
  let validate;

  if (!actionTypes) {
    return null;
  }

  // map each type in actionTypes array to value
  if (field === 'passwordConfirm') {
    validate = [isRequired(value), isValidPasswordConfirm(value, values)];
  } else {
    // map each type in actionTypes array to value
    validate = actionTypes.map(val => val(value));
  }

  // filter out undefined actionTypes i.e. actionTypes with no error
  const fieldError = validate.filter(val => val !== undefined)[0];

  if (typeof fieldError !== 'string') {
    return null;
  }

  return fieldError;
};

export default syncValidate;
