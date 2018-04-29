import mealsDB from '../dummyData/meals';
import GetItems from '../middlewares/GetItems';

/**
 * @exports
 * @class Meals
 */
class Meals {
  /**
   * Registers a new meal
   * @method list
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static list(req, res) {
    return GetItems.items(req, res, mealsDB, 'meals');
  }
}

export default Meals;
