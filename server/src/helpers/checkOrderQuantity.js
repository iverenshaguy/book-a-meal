import isInt from 'validator/lib/isInt';

/**
 * Function to check if order quantity is valid
 * @param {array} value
 * @return {(array|bool)} returns array of errors or true
 */
function checkOrderQuantity(value) {
  const err = [];

  value.forEach((item) => {
    if (!isInt(`${item.quantity}`)) err.push(`Quantity for meal ${item.mealId} must be an integer`);
    if (item.quantity <= 0) err.push(`Quantity for meal ${item.mealId} must be greater than 0`);
  });

  if (err.length) throw new Error(err);

  return true;
}

export default checkOrderQuantity;
