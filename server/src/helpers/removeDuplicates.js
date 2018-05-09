import stringToArray from './stringToArray';

/**
 * Function to remove duplicate mealIds in array
 * @param {string} mealIdArr
 * @return {array} returns unique array
 */
function removeDuplicates(mealIdArr) {
  const mealIds = stringToArray(mealIdArr, ',');

  const unique = new Set(mealIds);

  return [...unique];
}

export default removeDuplicates;
