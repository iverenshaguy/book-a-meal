import mealsDB from '../dummyData/meals';
import GetItems from '../middlewares/GetItems';

// const token = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';

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
    return GetItems(req, res, mealsDB, 'meals');
  }
}

export default Meals;
