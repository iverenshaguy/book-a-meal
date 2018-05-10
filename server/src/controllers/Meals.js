import moment from 'moment';
import db from '../models';
import GetItems from '../middlewares/GetItems';
import errors from '../../data/errors.json';

/**
 * @exports
 * @class Meals
 */
class Meals {
  /**
   * Returns a list of Meal Opyions
   * @method getMeals
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMeals(req, res) {
    const { userId } = req;
    const mealList = await db.Meal.findAll({ where: { userId } });
    return GetItems.items(req, res, mealList, 'meals');
  }

  /**
   * Creates a new item
   * @method create
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   * date is either equal to today or given date
   */
  static async create(req, res) {
    req.body.userId = req.userId;
    req.body.date = req.body.date || moment().format('YYYY-MM-DD');
    req.body.price = parseInt(req.body.price, 10);

    const meal = await db.Meal.create(req.body, { include: [db.User] });

    return res.status(201).json(meal);
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
    const { userId } = req;

    if (!Object.values(req.body).length) return res.status(422).json({ error: errors.empty });

    const mealItem = await db.Meal.findOne({ where: { mealId, userId } });

    if (!mealItem) return res.status(404).json({ error: errors[404] });

    const updatedMeal = await mealItem.update({ ...mealItem, ...req.body });

    return res.status(200).json(updatedMeal);
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
    const { userId } = req;
    const mealItem = await db.Meal.findOne({ where: { mealId, userId } });

    if (!mealItem) return res.status(404).json({ error: errors[404] });

    await mealItem.destroy();

    return res.status(204).json();
  }
}

export default Meals;
