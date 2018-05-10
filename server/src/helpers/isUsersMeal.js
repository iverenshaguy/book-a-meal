import db from '../models';

/**
 * Function to check if meal belongs to the user adding it to menu
 * @param {string} mealIds
 * @param {string} userId
 * @return {(bool|error)} returns true or throws error
 */
async function isUsersMeal(mealIds, userId) {
  const mealErrorArr = [];

  const checks = mealIds.map(async (mealId) => {
    const meal = await db.Meal.findOne({ where: { mealId, userId } });

    if (!meal) mealErrorArr.push(`You don't have access to Meal ${mealId}`);
  });

  await Promise.all(checks);
  if (mealErrorArr.length === 0) return true;
  throw new Error(mealErrorArr);
}

export default isUsersMeal;
