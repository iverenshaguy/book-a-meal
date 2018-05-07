import uuidv4 from 'uuid/v4';
import moment from 'moment';
import mealsDB from '../../data/meals.json';
import GetItems from '../middlewares/GetItems';
import errors from '../../data/errors.json';
import trimValues from '../helpers/trimValues';

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
    const trimmedData = trimValues(req.body);
    // generate random id and created/updated date
    trimmedData.mealId = uuidv4();
    trimmedData.created = moment().format();
    trimmedData.updated = moment().format();

    mealsDB.push(trimmedData);

    return res.status(201).send(trimmedData);
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
    const itemIndex = mealsDB
      .findIndex(item => item.mealId === req.params.mealId &&
        item.userId === req.body.userId);

    // return 404 error if index isn't found ie meal option doesnt exist
    if (itemIndex === -1) {
      return res.status(404).send({ error: errors[404] });
    }

    const oldItem = mealsDB[itemIndex];

    // delete id from data
    delete req.body.mealId;

    const trimmedData = trimValues(req.body);
    trimmedData.updated = moment().format();

    // update old meal with trimmed new meal and assign it to it's position in the array
    mealsDB[itemIndex] = Object.assign({}, oldItem, trimmedData);

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
