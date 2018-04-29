import moment from 'moment';
import menuDB from '../../data/menu.json';

/**
 * Function to check if menu for the day contains meal
 * @param {string} mealId
 * @return {bool} returns false or true
 */
function isMealAvailable(mealId) {
  const currentDate = moment().format('YYYY-MM-DD');
  // find a menu whose date is today and has the meal as an available meal for the day
  const meal = menuDB.find(item => item.date.includes(currentDate)
    && item.meals.includes(mealId));

  if (!meal) return false;

  return true;
}

export default isMealAvailable;
