/**
 * Returns number of errors in form
 * @function formErrorCount
 * @param {object} formErrors
 * @returns {number} Number of errors
 */
const formErrorCount = formErrors => Object.values(formErrors)
  .filter(value => value !== null).length;

export default formErrorCount;
