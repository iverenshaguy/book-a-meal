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
  const promises = items.map(item => isMealAvailable(item, req.body.date).then((mealAvai) => {
    if (!mealAvai) err.push(`Meal ${item} is not available`);
  }));

  const errs = Promise.all(promises).then(() => {
    if (err.length === 0) return true;
    if (err.length !== 0) throw new Error(err);
  });

  return errs;
}

export default isValidOrderItems;
