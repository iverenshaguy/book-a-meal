import moment from 'moment';
import db from '../models';
import errors from '../../data/errors.json';

/**
 * @exports
 * @class Menu
 */
class Menu {
  /**
   * Gets the menu for the day
   * @method getMenuForDay
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMenuForDay(req, res) {
    const { role } = req;

    if (role === 'caterer') return Menu.getMenuForCaterer(req, res);
    return Menu.getMenuForUser(req, res);
  }

  /**
   * Gets the menu for the day
   * @method getMenuForUser
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMenuForUser(req, res) {
    const date = moment().format('YYYY-MM-DD');

    const menuArray = await db.Menu.findAll({ where: { date } });

    const promises = menuArray.map(menu => Menu.getArrayOfMeals(menu).then(() => menu));

    const menuPerDay = await Promise.all(promises);

    return res.status(200).json({ menu: menuPerDay });
  }

  /**
   * Gets the menu for the day
   * @method getMenuForCaterer
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMenuForCaterer(req, res) {
    const date = req.query.date || moment().format('YYYY-MM-DD');

    const menu = await db.Menu.findOne({ where: { date, userId: req.userId } });

    if (!menu) {
      return res.status(200).json({ message: 'You don\'t have a menu for this day' });
    }

    const menuPerDay = await Menu.getArrayOfMeals(menu).then(() => menu);

    return res.status(200).json(menuPerDay);
  }

  /**
   * Creates a new item
   * @method create
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   * date is either equal to the request date or the default date (today)
   * check menu unique ensures that menu doesn't already exists in db
   * Notifications are also created when a new menu is added
   */
  static async create(req, res) {
    const { userId } = req;
    const defaultDate = moment().format('YYYY-MM-DD');

    req.body.date = req.body.date || defaultDate;
    req.body.meals = [...(new Set(req.body.meals))];

    const isMenuCreated = await db.Menu.findOne({ where: { date: req.body.date, userId } });

    if (isMenuCreated) return res.status(400).json({ error: 'Menu already exists for this day' });

    const newMenu = await db.Menu.create({ date: req.body.date, userId }, { include: [db.User] })
      .then(async (menu) => {
        await menu.setMeals(req.body.meals, { through: db.MenuMeal });
        await Menu.getArrayOfMeals(menu);

        return menu;
      });

    return res.status(201).json(newMenu);
  }


  /**
   * Updates an existing item
   * @method update
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async update(req, res) {
    const menu = await db.Menu
      .findOne({ where: { menuId: req.params.menuId, userId: req.userId } });

    if (!menu) return res.status(404).json({ error: errors[404] });

    if (menu.date.toString() < moment().format('YYYY-MM-DD').toString()) {
      return res.status(400).json({ error: 'Menu Expired' });
    }

    req.body.meals = [...(new Set(req.body.meals))];

    await menu.setMeals([], { through: db.MenuMeal });
    const updatedMenu = await menu.setMeals(req.body.meals, { through: db.MenuMeal })
      .then(async () => {
        await Menu.getArrayOfMeals(menu);
        return menu;
      });

    return res.status(200).json(updatedMenu);
  }

  /**
   * Gets meals for the Menu
   * @method getArrayOfMeals
   * @memberof Controller
   * @param {OBJECT} menu
   * @returns {array} Array of Meals
   */
  static async getArrayOfMeals(menu) {
    menu.dataValues.meals = await menu.getMeals({
      attributes: ['mealId', 'title', 'imageURL', 'description', 'vegetarian', 'price'],
      joinTableAttributes: []
    });
  }
}

export default Menu;
