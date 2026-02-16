/**
 * Converts array to object with similar values for Form Component initial state
 * @function arrayToObject
 * @param {array} array - array
 * @param {any} value - value
 * @returns {void}
 */
const arrayToObject = (array, value) => array.reduce((obj, item) => {
  obj[item] = value;
  return obj;
}, {});

export default arrayToObject;
