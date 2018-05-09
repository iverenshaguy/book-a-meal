import moment from 'moment';
import db from '../models';
/**
 * Function to check if menu for the day contains meal
 * @param {string} mealId
 * @return {bool} returns false or true
 * find a menu whose date is today and has the meal as an available meal for the day
 */
async function isMealAvailable(mealId) {
  const date = moment().format('YYYY-MM-DD');
  const menu = await db.Menu.findOne({ where: { date } });

  if (!menu) return false;

  const meals = await menu.getMeals({ attributes: ['mealId'] });
  const mealIdArr = meals.map(meal => meal.mealId);
  const checkMeal = mealIdArr.includes(mealId);

  if (!checkMeal) return false;

  return true;
}

export default isMealAvailable;
