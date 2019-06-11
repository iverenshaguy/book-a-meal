import isArrayOfUUID from './isArrayOfUUID';

/**
 * Function to check if values of an array are UUIDs
 * @param {string} value
 * @return {func} returns function isUUID/isArrayOfUUIDs
 */
function checkMealsId(value) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return false;
    }

    return isArrayOfUUID(value);
  }

  return false;
}

export default checkMealsId;
