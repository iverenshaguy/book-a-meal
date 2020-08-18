import moment from 'moment';
import models from '../models';
/**
 * Function to check if menu for the day passed in contains meal
 * @param {string} mealId
 * @param {string} date
 * @return {bool} returns false or true
 * find a menu whose date is the date passed in and
 * has the meal as an available meal for that day
 */
async function isMealAvailable(mealId, date = moment().format('YYYY-MM-DD')) {
  const mealIdArray = [];
  const menuArray = await models.Menu.findAll({ where: { date }, paranoid: true });

  if (menuArray.length === 0) return false;

  const promises = menuArray.map(menu => menu.getMeals({ attributes: ['mealId'] })
    .then(meals => mealIdArray.push(...meals)));

  await Promise.all(promises);
  const arrayOfMealIds = mealIdArray.map(meal => meal.mealId);
  const checkMeal = arrayOfMealIds.includes(mealId);

  if (!checkMeal) return false;

  return true;
}

export default isMealAvailable;
