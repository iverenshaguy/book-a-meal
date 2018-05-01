import isUUID from 'validator/lib/isUUID';

/**
 * Function to check if values of an array are UUIDs
 * @param {string} value
 * @return {(bool)} returns true or false
 */
function isArrayOfUUID(value) {
  const mealErrorArr = [];
  value.forEach((item) => {
    // check if each item is a uuid
    if (!isUUID(item, 4)) {
      mealErrorArr.push(` MealId ${item} is invalid`);
    }
  });

  if (mealErrorArr.length === 0) return true;

  throw new Error(mealErrorArr);
}

export default isArrayOfUUID;
