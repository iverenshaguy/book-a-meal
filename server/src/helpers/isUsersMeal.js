import db from '../models';
import stringToArray from './stringToArray';

/**
 * Function to check if meal belongs to the user adding it to menu
 * @param {string} mealIdArr
 * @param {string} userId
 * @return {(bool|error)} returns true or throws error
 */
async function isUsersMeal(mealIdArr, userId) {
  const mealIds = stringToArray(mealIdArr, ',');
  const mealErrorArr = [];

  const checks = mealIds.map(async (mealId) => {
    const meal = await db.Meal.findOne({ where: { mealId, userId } });

    if (!meal) mealErrorArr.push(`Meal ${mealId} doesn't exist`);
  });

  const errs = Promise.all(checks).then(() => {
    if (mealErrorArr.length === 0) return true;
    if (mealErrorArr.length !== 0) throw new Error(mealErrorArr);
  });

  return errs;
}

export default isUsersMeal;
