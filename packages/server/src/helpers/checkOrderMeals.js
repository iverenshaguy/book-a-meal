/**
 * Function to check if order meals is a valid array of meal object
 * @param {array} value
 * @return {(array|bool)} returns array of errors or true
 */
function checkOrderMeals(value) {
  const err = [];
  value.forEach((item, index) => {
    if (!(typeof item === 'object' && item.constructor === Object)) {
      err.push(`Item ${index + 1} must be an object of mealId and quantity`);
      return;
    }

    if (!item.mealId || !item.quantity) {
      err.push(`Item ${index + 1} must include both the mealId and meal quantity`);
    }
  });

  if (err.length) throw new Error(err);

  return true;
}

export default checkOrderMeals;
