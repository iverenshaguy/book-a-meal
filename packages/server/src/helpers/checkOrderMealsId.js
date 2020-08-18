import checkMealsId from './checkMealsId';

/**
 * Function to check if order mealIds are valid
 * @param {array} value
 * @return {(array|bool)} returns array of errors or true
 */
function checkOrderMealIds(value) {
  const mealIds = value.map(item => item.mealId);

  return (checkMealsId(mealIds));
}

export default checkOrderMealIds;
