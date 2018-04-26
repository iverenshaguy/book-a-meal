import isUUID from 'validator/lib/isUUID';
import isArrayOfUUID from './isArrayOfUUID';

/**
 * Function to check if values of an array are UUIDs
 * @param {string} value
 * @return {(bool)} returns true or false
 */
function checkMealsId(value) {
  if (Array.isArray(value) && value.length === 0) {
    return false;
  }

  if (Array.isArray(value) && value.length !== 0) {
    return isArrayOfUUID(value);
  }

  // since value is a string, remove square brackets
  //  and spaces and convert to an array
  const newString = value.replace(/[[\]\s/n']+/g, ''); // eslint-disable-line
  const newValue = newString.includes(',') ? newString.split(',') : newString;

  if (!Array.isArray(newValue)) {
    return isUUID(newValue, 4);
  }

  return isArrayOfUUID(newValue);
}

export default checkMealsId;
