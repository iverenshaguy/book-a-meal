import moment from 'moment';

/**
 * Function to check if item is expired
 * @param {object} type
 * @param {object} db
 * @param {string} id
 * @return {bool} returns true or false
 * order is expirde after 15 mins of ordering
 */
function isExpired(type, db, id) {
  const check = db.find(item => item[`${type}Id`] === id);
  const currentDate = moment().format('YYYY-MM-DD');
  const itemDate = check.createdAt.substring(0, 10);

  if (moment(currentDate).isAfter(itemDate)) return true;

  return false;
}

export default isExpired;
