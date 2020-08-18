/**
 * Function to map order meals by caterer
 * @param {object} order
 * @return {object} returns map of caterer to array of order meal item(s)
 */
function mapCaterersOrder(order) {
  const mappedMeals = {};

  return order.getMeals().then((meals) => {
    meals.forEach((meal) => {
      if (mappedMeals[meal.userId]) {
        return mappedMeals[meal.userId].push(meal);
      }

      mappedMeals[meal.userId] = [meal];
    });

    order.meals = mappedMeals;
    return order;
  });
}

export default mapCaterersOrder;
