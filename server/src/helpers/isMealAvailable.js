import moment from 'moment';
import menuDB from '../../data/menu.json';

/**
 * Function to check if menu for the day contains meal
 * @param {string} mealId
 * @param {string} date
 * @return {bool} returns false or true
 */
function isMealAvailable(mealId, date = moment().format('YYYY-MM-DD')) {
  // find a menu whose date is today and has the meal as an available meal for the day
  const meal = menuDB.find(item => item.date.includes(date)
    && item.meals.includes(mealId));

  if (!meal) return false;

  return true;
}

export default isMealAvailable;
