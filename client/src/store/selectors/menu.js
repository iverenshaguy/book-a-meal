import moment from 'moment';

const flattenMealsIntoSingleArray = (menu) => {
  const meals = menu.reduce((newArray, item) => {
    newArray.push(...item.meals);
    return newArray;
  }, []);

  return {
    id: null,
    date: moment().format('YYYY-MM-DD'),
    meals
  };
};

export default { flattenMealsIntoSingleArray };
