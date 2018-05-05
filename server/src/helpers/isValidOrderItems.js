import stringToArray from './stringToArray';
import isMealAvailable from './isMealAvailable';

/**
 * Function to check if meal item is valid
 * @param {array} items
 * @param {object} req
 * @return {bool} returns false or true
 */
function isValidOrderItems(items, req) {
  const errArr = [];
  items = stringToArray(items, ',');
  // check mealId availability
  const promises = items.map(async (item) => {
    await isMealAvailable(item, req.body.date).then((mealAvai) => {
      if (!mealAvai) errArr.push(`Meal ${item} is not available`);
    });
  });

  const errs = Promise.all(promises).then(() => {
    if (errArr.length === 0) return true;
    if (errArr.length !== 0) throw new Error(errArr);
  });

  return errs;
}

export default isValidOrderItems;
