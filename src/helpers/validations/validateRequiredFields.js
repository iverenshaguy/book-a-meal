/**
 * checks if all required fields are filled
 * @function validateRequiredFields
 * @param {array} requiredFields - required fields
 * @param {object} values - field values
 * @returns {bool}  true or false
 */
const validateRequiredFields = (requiredFields, values) => {
  let valid = true;
  requiredFields.forEach((item) => {
    if (!values[item]) {
      valid = false;
      return valid;
    }
  });

  return valid;
};

export default validateRequiredFields;
