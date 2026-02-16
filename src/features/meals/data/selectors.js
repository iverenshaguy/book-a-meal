/**
 * @function getLastMealItem
 * @param {array} mealItems array of meal items
 * @returns {object} meal item
 */
export const getLastMealItem = (mealItems) => mealItems[mealItems.length - 1];

export default { getLastMealItem };
