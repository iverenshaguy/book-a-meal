import stringToArray from './stringToArray';

/**
 * Function to create a meal order from an array of meal Ids
 * @param {string} mealIdArr
 * @return {array} returns unique array
 * function stringToArray converts string to an array
 */
function createMealOrder(mealIdArr) {
  const mealIds = stringToArray(mealIdArr, ',');
  const objArr = [];

  mealIds.forEach((id) => {
    const idExists = objArr.find(item => item.mealId === id);
    if (idExists) idExists.quantity = 1 + idExists.quantity;
    else objArr.push({ mealId: id, quantity: 1 });
  });

  return objArr;
}

export default createMealOrder;
