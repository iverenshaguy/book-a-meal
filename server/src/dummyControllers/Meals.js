import uuidv4 from 'uuid/v4';
import moment from 'moment';
import mealsDB from '../../data/meals.json';
// import GetItems from '../middlewares/GetItems';
import errors from '../../data/errors.json';

/**
 * @exports
 * @class Meals
 */
class Meals {
  /**
   * Returns a list of Items
   * @method getMeals
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  // static getMeals(req, res) {
  // return GetItems.items(req, res, mealsDB, 'meals');
  // }

  /**
   * Creates a new item
   * @method create
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   * default date is today
   */
  static create(req, res) {
    const newMeal = { ...req.body };
    const today = moment().format();
    const defaultDate = moment().format('YYYY-MM-DD');

    newMeal.date = newMeal.date || defaultDate;
    newMeal.mealId = uuidv4();
    newMeal.createdAt = today;
    newMeal.updatedAt = today;

    mealsDB.push(newMeal);

    return res.status(201).json(newMeal);
  }

  /**
   * Updates an existing item
   * @method update
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  static update(req, res) {
    const data = { ...req.body };
    const itemIndex = mealsDB
      .findIndex(item => item.mealId === req.params.mealId &&
        item.userId === req.body.userId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: errors[404] });
    }

    // TODO validate empty put request

    const oldItem = mealsDB[itemIndex];

    delete req.body.mealId;

    data.updatedAt = moment().format();
    mealsDB[itemIndex] = { ...oldItem, ...data };

    return res.status(200).json(mealsDB[itemIndex]);
  }

  /**
   * Deletes an existing item
   * @method delete
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  static delete(req, res) {
    const itemIndex = mealsDB
      .findIndex(item => item.mealId === req.params.mealId &&
      item.userId === req.body.userId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: errors[404] });
    }

    mealsDB.splice(itemIndex, 1);

    return res.status(204).json();
  }
}

export default Meals;
