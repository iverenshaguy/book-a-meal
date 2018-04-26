import isUUID from 'validator/lib/isUUID';

/**
 * Function to check if values of an array are UUIDs
 * @param {string} value
 * @return {(bool)} returns true or false
 */
function isArrayOfUUID(value) {
  let isValid = true;

  value.forEach((item) => {
    // check if each item is a uuid
    if (!isUUID(item, 4)) {
      isValid = false;
    }
  });

  return isValid;
}

export default isArrayOfUUID;
