import moment from 'moment';
import { Op } from 'sequelize';
import models from '../models';
import errors from '../../lib/errors.json';
import NotificationEventEmitter from '../eventEmitters/NotificationEventEmitter';
import Pagination from '../utils/Pagination';

/**
 * @exports
 * @class MenuController
 */
class MenuController {
  /**
   * Creates a new menu item
   * @method createMenu
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * date is either equal to the request date or the default date (today)
   * Notifications are also created when a new menu is added
   */
  static async createMenu(req, res) {
    const { userId, body: { date, meals } } = req;
    const defaultDate = moment().format('YYYY-MM-DD');

    const menuDate = date || defaultDate;
    const menuMeals = [...(new Set(meals))];

    await models.Menu.findOrCreate({
      where: { date: menuDate, userId },
      defaults: { date: menuDate, userId },
      attributes: [['menuId', 'id'], 'date'],
      include: [{
        model: models.User,
        as: 'caterer'
      }]
    }).spread(async (menu, created) => {
      if (!created) return res.status(400).json({ error: 'Menu already exists for this day' });

      await menu.setMeals(menuMeals, { through: models.Menu });
      await MenuController.getArrayOfMeals(menu);

      const newMenu = MenuController.getMenuObject(menu);

      if (menuDate === moment().format('YYYY-MM-DD')) {
        NotificationEventEmitter.emit('createMenu', newMenu, userId);
      }

      return res.status(201).json(newMenu);
    });
  }


  /**
   * Updates an menu existing item
   * @method updateMenu
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async updateMenu(req, res) {
    const { userId, params: { menuId }, body: { meals } } = req;

    const menu = await models.Menu.findOne({ where: { menuId, userId } });

    if (!menu) return res.status(404).json({ error: errors[404] });

    if (menu.date.toString() < moment().format('YYYY-MM-DD').toString()) {
      return res.status(400).json({ error: 'Menu Expired' });
    }

    const menuMeals = [...(new Set(meals))];

    await menu.setMeals([], { through: models.MenuMeal });

    const updatedMenu = await menu.setMeals(menuMeals, { through: models.MenuMeal })
      .then(async () => {
        await MenuController.getArrayOfMeals(menu);

        return MenuController.getMenuObject(menu);
      });

    NotificationEventEmitter.emit('createMenu', updatedMenu, userId);

    return res.status(200).json(updatedMenu);
  }

  /**
   * Gets the menu for the day
   * @method getMenuForDay
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static getMenuForDay(req, res) {
    const { role } = req;

    return role === 'caterer'
      ? MenuController.getMenuForCaterer(req, res)
      : MenuController.getMenuForCustomer(req, res);
  }

  /**
   * Gets the menu for the day for the customer
   * @method getMenuForCustomer
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMenuForCustomer(req, res) {
    const date = moment().format('YYYY-MM-DD');
    const { page, search } = req.query;
    const paginate = new Pagination(page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();
    const where = search ? { title: { [Op.iLike]: `%${search}%` } } : undefined;

    const menuMealsData = await models.Meal.findAndCountAll({
      where,
      attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
      offset,
      limit,
      subQuery: false,
      include: [
        { model: models.User, as: 'caterer', attributes: [] },
        {
          model: models.Menu,
          where: { date },
          attributes: [],
          through: { attributes: [] }
        }
      ],
    });

    return res.status(200).json({
      menu: { date, meals: menuMealsData.rows },
      metadata: paginate.getPageMetadata(menuMealsData.count, '/menu')
    });
  }

  /**
   * Gets the menu for the day for the caterer
   * @method getMenuForCaterer
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMenuForCaterer(req, res) {
    const { query: { date, page } } = req;
    const menuDate = date || moment().format('YYYY-MM-DD');
    const paginate = new Pagination(page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();

    const menuMealsData = await models.Meal.findAndCountAll({
      attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
      offset,
      limit,
      subQuery: false,
      include: [
        { model: models.User, as: 'caterer', attributes: [] },
        {
          model: models.Menu,
          where: { date: menuDate, userId: req.userId },
          attributes: [['menuId', 'id'], 'date'],
          through: { attributes: [] }
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const menu = MenuController.mapCatererMenu(menuDate, menuMealsData.rows);
    const extraQuery = date ? `date=${date}` : '';

    return res.status(200).json({
      menu, metadata: paginate.getPageMetadata(menuMealsData.count, '/menu', extraQuery)
    });
  }

  /**
   * Maps created and updated menu to readable object
   * @method getMenuObject
   * @memberof Controller
   * @param {object} menu
   * @returns {object} Menu object
   */
  static getMenuObject(menu) {
    const { menuId, date, meals } = menu.get();
    return {
      id: menuId,
      date: moment(date).format('YYYY-MM-DD'),
      meals
    };
  }

  /**
   * Gets array of meals for created and updated menu
   * @method getArrayOfMeals
   * @memberof Controller
   * @param {object} menu
   * @returns {array} Array of Meals
   */
  static async getArrayOfMeals(menu) {
    menu.dataValues.meals = await menu.getMeals({
      attributes: [['mealId', 'id'], 'title', 'imageUrl', 'description', 'vegetarian', 'price'],
      joinTableAttributes: [],
      order: [['createdAt', 'DESC']]
    });
  }

  /**
   * Maps returned Caterer Menuto readable object
   * @method mapCatererMenu
   * @memberof Controller
   * @param {string} date
   * @param {array} menuMeals
   * @returns {array} Array of Meals
   * The array of meals passed into the function has the menuId
   * on each eagerly loader Menus element of the array
   */
  static mapCatererMenu(date, menuMeals) {
    const { id } = menuMeals.length ? menuMeals[0].get().Menus[0].get() : {};
    const meals = [...menuMeals];

    if (meals.length) meals.forEach(meal => delete meal.get().Menus);

    return { id, date, meals };
  }
}

export default MenuController;
