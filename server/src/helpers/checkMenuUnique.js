import menuDB from '../../data/menu.json';

/**
 * Function to check if menu for this day already exits
 * @param {string} value
 * @param {string} userId
 * @return {(bool)} returns true or false
 */
function checkMenuUnique(value, userId) {
  const check = menuDB.find(menu => menu.date === value && menu.userId === userId);

  return !check;
}

export default checkMenuUnique;
