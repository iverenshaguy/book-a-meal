import uuidv4 from 'uuid/v4';
import moment from 'moment';
import mealsDB from '../../data/meals.json';
import GetItems from '../middlewares/GetItems';
import errors from '../../data/errors.json';

/**
 * @exports
 * @class Meals
 */
class Meals {
  /**
   * Returns a list of Items
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
   * Creates a new item
   * @method create
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  static create(req, res) {
    const newMeal = { ...req.body };
    const today = moment().format();
    const defaultDate = moment().format('YYYY-MM-DD');

    // date is either equal to today or given date
    newMeal.date = newMeal.date || defaultDate;
    // generate random id and created/updated date
    newMeal.mealId = uuidv4();
    newMeal.created = today;
    newMeal.updated = today;

    mealsDB.push(newMeal);

    return res.status(201).send(newMeal);
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

    // return 404 error if index isn't found ie meal option doesnt exist
    if (itemIndex === -1) {
      return res.status(404).send({ error: errors[404] });
    }

    // return meal item if no data was sent ie req.body is only poulated with userId && role
    if (Object.keys(req.body).length === 2) return res.status(200).send(mealsDB[itemIndex]);

    const oldItem = mealsDB[itemIndex];

    // delete id from data
    delete req.body.mealId;

    data.updated = moment().format();

    // update old meal with trimmed new meal and assign it to it's position in the array
    mealsDB[itemIndex] = { ...oldItem, ...data };

    return res.status(200).send(mealsDB[itemIndex]);
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

    // return 404 error if index isn't found ie meal option doesnt exist
    if (itemIndex === -1) {
      return res.status(404).send({ error: errors[404] });
    }

    mealsDB.splice(itemIndex, 1);

    return res.status(204).send();
  }
}

export default Meals;
