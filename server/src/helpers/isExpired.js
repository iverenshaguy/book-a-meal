import moment from 'moment';

/**
 * Function to check if item is expired
 * @param {object} type
 * @param {object} db
 * @param {string} id
 * @return {bool} returns true or false
 */
function isExpired(type, db, id) {
  // get menu from menu db and check to ensure that order is not expired
  // order is expired when the day passes
  const check = db.find(item => item[`${type}Id`] === id);
  const currentDate = moment().format('YYYY-MM-DD');
  const itemDate = check.created.substring(0, 10); // extract day string from date
  // return error if order is already expired, i.e. in the past
  if (moment(currentDate).isAfter(itemDate)) return true;

  return false;
}

export default isExpired;
