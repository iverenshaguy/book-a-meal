import { isRequired, isValidPasswordConfirm } from './types';
import validation from './validation';

/**
 * sync Validate supplied field
 * @function syncValidate
 * @param {string} type - validation types
 * @param {string} field - field to test
 * @param {object} values - all field values
 * @returns {string} field Error
 */
const syncValidate = type => (field, values) => {
  const value = values[field];
  const types = validation[type][field];
  let validate;

  if (!types) {
    return null;
  }

  // map each type in types array to value
  if (field === 'passwordConfirm') {
    validate = [isRequired(value), isValidPasswordConfirm(value, values)];
  } else {
    // map each type in types array to value
    validate = types.map(val => val(value));
  }

  // filter out undefined types i.e. types with no error
  const fieldError = validate.filter(val => val !== undefined)[0];

  if (typeof fieldError !== 'string') {
    return null;
  }

  return fieldError;
};

export default syncValidate;
