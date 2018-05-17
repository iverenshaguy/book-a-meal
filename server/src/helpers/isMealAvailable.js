import moment from 'moment';
import db from '../models';
/**
 * Function to check if menu for the day contains meal
 * @param {string} mealId
 * @param {string} date
 * @return {bool} returns false or true
 * find a menu whose date is today and has the meal as an available meal for the day
 */
async function isMealAvailable(mealId, date = moment().format('YYYY-MM-DD')) {
  const mealIdArray = [];
  const menuArray = await db.Menu.findAll({ where: { date }, paranoid: true });

  if (menuArray.length === 0) return false;

  const promises = menuArray.map(menu => menu.getMeals({ attributes: ['mealId'] })
    .then(meals => mealIdArray.push(...meals)));

  await Promise.all(promises);
  const mealIdArr = mealIdArray.map(meal => meal.mealId);
  const checkMeal = mealIdArr.includes(mealId);

  if (!checkMeal) return false;

  return true;
}

export default isMealAvailable;
