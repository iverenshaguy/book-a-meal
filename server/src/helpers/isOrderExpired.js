import moment from 'moment';
import db from '../models';

/**
 * Function to check if item is expired
 * @param {string} id
 * @return {bool} returns true or false
 * order is expirde after 15 mins of ordering
 */
async function isOrderExpired(id) {
  const check = await db.Order.findOne({ where: { orderId: id } });
  const currentDate = moment().format();
  const itemDate = check.createdAt;
  const expiry = parseInt(process.env.EXPIRY, 10);
  return parseInt(moment(currentDate).diff(itemDate, 'minutes'), 10) > expiry;
}

export default isOrderExpired;
