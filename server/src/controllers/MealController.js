import { Op } from 'sequelize';
import models from '../models';
import errors from '../../lib/errors.json';
import Pagination from '../utils/Pagination';

/**
 * @exports
 * @class MealController
 */
class MealController {
  /**
   * Creates a new meal item
   * @method createMeal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   * date is either equal to today or given date
   */
  static async createMeal(req, res) {
    const { userId, body: { title, price } } = req;

    await models.Meal
      .findOrCreate({
        where: { title: { [Op.iLike]: title }, userId },
        defaults: { ...req.body, price: parseFloat(price), userId },
        include: [{
          model: models.User, as: 'caterer'
        }]
      })
      .spread((meal, created) => {
        if (!created) return res.status(409).json({ error: 'Meal already exists' });

        return res.status(201).json(MealController.getMealObject(meal));
      });
  }

  /**
   * Updates an existing meal item
   * @method updateMeal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   * First checks db to ensure another meal belonging to the user
   * doesnt have the new meal title
   */
  static async updateMeal(req, res) {
    const { userId, params: { mealId }, body: { title, price } } = req;

    const existingMealWithTitle = await models.Meal.findOne({
      where: {
        userId,
        title: { [Op.iLike]: title },
        mealId: { [Op.not]: mealId },
      }
    });

    if (existingMealWithTitle) return res.status(409).json({ error: 'Meal already exists' });

    const mealItem = await models.Meal.findOne({ where: { mealId, userId } });

    if (!mealItem) return res.status(404).json({ error: errors[404] });

    if (price) req.body.price = parseFloat(price);

    const updatedMeal = await mealItem.update({ ...mealItem, ...req.body });

    return res.status(200).json(MealController.getMealObject(updatedMeal));
  }

  /**
   * Deletes an existing meal item
   * @method deleteMeal
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async deleteMeal(req, res) {
    const { userId, params: { mealId } } = req;

    const mealItem = await models.Meal.findOne({ where: { mealId, userId } });

    if (!mealItem) return res.status(404).json({ error: errors[404] });

    await mealItem.destroy();

    return res.status(200).json({ message: 'Meal deleted successfully' });
  }

  /**
   * Returns a list of Meal Options
   * @method getMeals
   * @memberof MealController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMeals(req, res) {
    const { userId, query: { page, search } } = req;
    const paginate = new Pagination(page, req.query.limit, search);
    const { limit, offset } = paginate.getQueryMetadata();
    const where = search ? { userId, title: { [Op.iLike]: `%${search}%` } } : { userId };

    const mealsData = await models.Meal.findAndCountAll({
      where,
      limit,
      offset,
      paranoid: true,
      attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
      order: [['createdAt', 'DESC']]
    });

    const extraQuery = search ? `search=${search}` : '';

    return res.status(200).json({
      meals: mealsData.rows, metadata: paginate.getPageMetadata(mealsData.count, '/meals', extraQuery)
    });
  }

  /**
   * Creates a New Meal Object from Meal Item
   * @method getMealObject
   * @memberof MealController
   * @param {object} meal
   * @returns {object} Object
   */
  static getMealObject(meal) {
    const {
      mealId, title, imageUrl, description, vegetarian, price
    } = meal.get();

    return {
      id: mealId,
      title,
      imageUrl,
      description,
      vegetarian,
      price
    };
  }
}

export default MealController;
