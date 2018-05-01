import stringToArray from './stringToArray';

/**
 * Function to remove duplicate mealIds in array
 * @param {string} mealIdArr
 * @return {array} returns unique array
 */
function removeDuplicates(mealIdArr) {
  // make sure it's an array;
  const mealIds = stringToArray(mealIdArr);

  // use set to remove duplicate values
  const unique = new Set(mealIds);

  // convert set to array and return it
  return [...unique];
}

export default removeDuplicates;
