import stringToArray from './stringToArray';
import isMealAvailable from './isMealAvailable';

/**
 * Function to check if meal item is valid
 * A meal item is valid if it is available in the menu for the day
 * @param {array} items
 * @param {object} req
 * @return {bool} returns false or true
 */
function isValidOrderItems(items, req) {
  const errArr = [];
  items = stringToArray(items, ',');
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
