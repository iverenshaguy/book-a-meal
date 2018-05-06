import db from '../models';

/**
 * Function to check if menu for this day already exits
 * @param {string} value
 * @param {string} userId
 * @return {(bool)} returns true or false
 */
async function checkMenuUnique(value, userId) {
  const check = await db.Menu.findOne({ where: { date: value, userId } });

  return !check;
}

export default checkMenuUnique;
