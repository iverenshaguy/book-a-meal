/**
 * Returns array of touched fields in form
 * @function getTouchedFields
 * @param {object} formTouchedObject
 * @returns {array} Array of touched fields
 */
const getTouchedFields = formTouchedObject => Object.keys(formTouchedObject).filter(key =>
  formTouchedObject[key] === true);

export default getTouchedFields;
