/**
 * checks if all required fields are filled
 * @function validateRequiredFields
 * @param {array} touchedFields - touched fields
 * @param {array} requiredFields - required fields
 * @param {object} values - field values
 * @returns {bool}  true or false
 */
const validateRequiredFields = (touchedFields, requiredFields, values) => {
  let valid = true;
  requiredFields.forEach((item) => {
    if (!touchedFields.includes(item) || !values[item]) {
      valid = false;
      return valid;
    }
  });

  return valid;
};

export default validateRequiredFields;
