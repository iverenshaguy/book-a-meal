import uuidv4 from 'uuid/v4';
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

  /**
   * Creates a new meal
   * @method create
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  static create(req, res, data) {
    // generate random id
    data.mealId = uuidv4();
    mealsDB.push(data);
    return res.status(201).send(data);
  }
}

export default Meals;
