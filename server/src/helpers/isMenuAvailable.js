import moment from 'moment';
import menuDB from '../data/menu.json';

/**
 * Function to check if menu is expired
 * @param {string} menuId
 * @param {string} msg
 * @return {bool} returns false or true
 */
function isMenuAvailable(menuId) {
  const menu = menuDB.find(item => item.menuId === menuId);
  const currentDate = moment().format('YYYY-MM-DD');

  if (!moment(currentDate).isSame(menu.date)) {
    return false;
  }

  return true;
}

export default isMenuAvailable;
