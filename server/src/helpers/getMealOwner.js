import mealsDB from '../../data/meals.json';

/**
 * Gets the user id of the meal caterer
 * @param {string} mealId
 * @return {string} meal caterer's user id
 */
function getMealOwner(mealId) {
  const meal = mealsDB.filter(item => item.mealId === mealId);
  return meal.userId;
}

export default getMealOwner;
