import stringToArray from './stringToArray';
import isMealAvailable from './isMealAvailable';

/**
 * Function to check if meal item is valid
 * @param {array} items
 * @param {object} req
 * @return {bool} returns false or true
 */
function isValidOrderItems(items, req) {
  const err = [];
  items = stringToArray(items, ',');
  // check mealId availability
  items.forEach((item) => {
    if (!isMealAvailable(item, req.body.date)) err.push(`Meal ${item} is not available`);
  });

  if (err.length === 0) return true;

  // stringify so that error can be seen
  throw new Error(err);
}

export default isValidOrderItems;
