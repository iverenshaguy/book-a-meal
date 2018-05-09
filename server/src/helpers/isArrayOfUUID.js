import isUUID from 'validator/lib/isUUID';

/**
 * Function to check if values of an array are UUIDs
 * @param {string} value
 * @return {(bool|error)} returns true or throws error
 */
function isArrayOfUUID(value) {
  const mealErrorArr = [];
  value.forEach((item) => {
    if (!isUUID(item, 4)) {
      mealErrorArr.push(` MealId ${item} is invalid`);
    }
  });

  if (mealErrorArr.length === 0) return true;

  throw new Error(mealErrorArr);
}

export default isArrayOfUUID;
