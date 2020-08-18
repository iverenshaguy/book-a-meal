import moment from 'moment';

/**
 * Function to check if date is valid
 * @param {string} value
 * @return {bool} returns false or true
 */
function validateDate(value) {
  if (!(/^\d{4}-\d{1,2}-\d{1,2}$/.test(value))) {
    throw new Error('Date is invalid, valid format is YYYY-MM-DD');
  }

  if (!moment(value).isValid()) {
    throw new Error('Date is invalid');
  }

  return true;
}

export default validateDate;
