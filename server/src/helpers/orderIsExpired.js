import moment from 'moment';
import menuDB from '../data/menu.json';

/**
 * Function to check if order is expired
 * @param {object} res
 * @param {string} menuId
 * @return {(JSON|nothing)} returns response object or nothing
 */
function orderIsExpired(res, menuId) {
  // get menu from menu db and check to ensure that order is not expired
  // order is expired when the day passes
  const menu = menuDB.find(item => item.menuId === menuId);
  const currentDate = moment().format('YYYY-MM-DD');

  // return 422 error if order is already expired, i.e. in the past
  if (moment(currentDate).isAfter(menu.date)) {
    return res.status(422).send({ error: 'Order is Expired' });
  }
}

export default orderIsExpired;
