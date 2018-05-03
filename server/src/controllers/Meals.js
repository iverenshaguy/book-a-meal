import moment from 'moment';
import db from '../models';
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
  static async create(req, res) {
    const newMeal = { ...req.body };
    delete newMeal.role;
    // date is either equal to today or given date
    newMeal.date = newMeal.date || moment().format('YYYY-MM-DD');
    newMeal.price = parseInt(newMeal.price, 10);

    const meal = await db.Meal.create(newMeal, { include: [db.User] });

    return res.status(201).send(meal);
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
  static async update(req, res) {
    const { mealId } = req.params;
    const { userId } = req.body;
    const data = { ...req.body };
    const mealItem = await db.Meal.findOne({ where: { mealId, userId } });

    // return 404 error if meal option doesnt exist
    if (!mealItem) return res.status(404).send({ error: errors[404] });

    const updatedMeal = await mealItem.update({ ...mealItem, ...data });

    return res.status(200).send(updatedMeal);
  }

  /**
   * Deletes an existing item
   * @method delete
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async delete(req, res) {
    const { mealId } = req.params;
    const { userId } = req.body;
    const mealItem = await db.Meal.findOne({ where: { mealId, userId } });

    // return 404 error if meal option doesnt exist
    if (!mealItem) return res.status(404).send({ error: errors[404] });

    await mealItem.destroy();

    return res.status(204).send();
  }
}

export default Meals;
