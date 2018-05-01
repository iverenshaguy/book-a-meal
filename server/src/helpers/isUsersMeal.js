import mealsDB from '../../data/meals.json';
import stringToArray from './stringToArray';

/**
 * Function to check if meal belongs to the user adding it to menu
 * @param {string} mealIdArr
 * @param {string} userId
 * @return {bool} returns false or true
 */
function isUsersMeal(mealIdArr, userId) {
  const mealIds = stringToArray(mealIdArr);
  const mealErrorArr = [];
  mealIds.forEach((mealId) => {
    const meal = mealsDB.find(item => item.mealId === mealId
      && item.userId === userId);

    if (!meal) mealErrorArr.push(`Meal ${mealId} doesn't exist`);
  });

  if (mealErrorArr.length === 0) return true;

  throw new Error(mealErrorArr);
}

export default isUsersMeal;
