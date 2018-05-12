/**
 * Function to create a meal order from an array of meal Ids
 * @param {string} mealIds
 * @return {array} returns unique array
 */
function createMealOrder(mealIds) {
  const objArr = [];

  mealIds.forEach((id) => {
    const idExists = objArr.find(item => item.mealId === id);
    if (idExists) idExists.quantity = 1 + idExists.quantity;
    else objArr.push({ mealId: id, quantity: 1 });
  });

  return objArr;
}

export default createMealOrder;
