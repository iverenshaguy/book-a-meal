/**
 * Function to check for unaccepted field
 * @param {string} type
 * @param {string} role
 * @param {string} value
 * @return {array} returns unique array
 */
function unacceptedField(type, role, value) {
  if (role && role === type && value) {
    throw new Error('Unaccepted Field');
  }

  return true;
}

export default unacceptedField;
