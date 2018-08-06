import { Op } from 'sequelize';
import db from '../models';
import errors from '../../data/errors.json';
import Pagination from '../utils/Pagination';

/**
 * @exports
 * @class Meals
 */
class Meals {
  /**
   * Creates a new meal item
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
    req.body.price = parseFloat(req.body.price);

    await db.Meal
      .findOrCreate({
        where: { title: { [Op.iLike]: req.body.title }, userId: req.userId },
        defaults: req.body,
        include: [{
          model: db.User, as: 'caterer'
        }]
      })
      .spread((meal, created) => {
        if (!created) return res.status(409).json({ error: 'Meal already exists' });

        return res.status(201).json(Meals.getMealObject(meal));
      });
  }

  /**
   * Updates an existing meal item
   * @method update
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   * First checks db to ensure another meal belonging to the user
   * doesnt have the new meal title
   */
  static async update(req, res) {
    const { mealId } = req.params;
    const { userId } = req;

    const existingMealWithTitle = await db.Meal.findOne({
      where: {
        title: { [Op.iLike]: req.body.title },
        mealId: { [Op.not]: mealId },
        userId: req.userId
      }
    });

    if (existingMealWithTitle) return res.status(409).json({ error: 'Meal already exists' });

    if (req.body.price) req.body.price = parseFloat(req.body.price);

    const mealItem = await db.Meal.findOne({ where: { mealId, userId } });

    if (!mealItem) return res.status(404).json({ error: errors[404] });

    const updatedMeal = await mealItem.update({ ...mealItem, ...req.body });

    return res.status(200).json(Meals.getMealObject(updatedMeal));
  }

  /**
   * Deletes an existing meal item
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

    return res.status(200).json({ message: 'Meal deleted successfully' });
  }

  /**
   * Returns a list of Meal Options
   * @method getMeals
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMeals(req, res) {
    const { userId } = req;
    const paginate = new Pagination(req.query.page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();

    const data = await db.Meal.findAndCountAll({
      where: { userId },
      limit,
      offset,
      paranoid: true,
      attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
      order: [['createdAt', 'DESC']]
    });

    const url = '/meals';

    return res.status(200).json({
      meals: data.rows, metadata: paginate.getPageMetadata(data.count, url)
    });
  }

  /**
   * Creates a New Meal Object from Meal Item
   * @method getMealObject
   * @memberof Meals
   * @param {object} meal
   * @returns {object} Object
   */
  static getMealObject(meal) {
    return {
      id: meal.getDataValue('mealId'),
      title: meal.getDataValue('title'),
      imageUrl: meal.getDataValue('imageUrl'),
      description: meal.getDataValue('description'),
      vegetarian: meal.getDataValue('vegetarian'),
      price: meal.getDataValue('price')
    };
  }
}

export default Meals;
