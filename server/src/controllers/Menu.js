import moment from 'moment';
import menuDB from '../../data/menu.json';
import db from '../models';
import Notifications from './Notifications';
import errors from '../../data/errors.json';
import checkMenuUnique from '../helpers/checkMenuUnique';
import removeDuplicates from '../helpers/removeDuplicates';

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
  static getMenuForDay(req, res) {
    const date = req.query.date || moment().format('YYYY-MM-DD');
    const menuForTheDay = menuDB.find(item => moment(item.date).isSame(date));

    if (!menuForTheDay) {
      return res.status(200).send({ message: 'No Menu is Available For This Day' });
    }

    // get meal object for each meal ID
    const menu = { ...menuForTheDay };
    menu.meals = Menu.getMealsObject(menu.meals);

    return res.status(200).send(menu);
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
    const { userId } = req.body;
    const defaultDate = moment().format('YYYY-MM-DD');

    req.body.date = req.body.date || defaultDate;
    req.body.meals = removeDuplicates(req.body.meals);

    const isMenuUnique = await checkMenuUnique(req.body.date, req.body.userId);

    if (!isMenuUnique) return res.status(422).send({ error: 'Menu already exists for this day' });

    const newMenu = await db.Menu.create({ date: req.body.date, userId }, { include: [db.User] })
      .then(async (menu) => {
        await menu.setMeals(req.body.meals, { through: db.MenuMeal });
        await Menu.getMealsObject(menu);

        Notifications.create({
          userId: null,
          orderId: null,
          menuId: req.body.menuId,
          message: 'The menu for today was just added'
        });

        return menu;
      });

    return res.status(201).send(newMenu);
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
      .findOne({ where: { menuId: req.params.menuId, userId: req.body.userId } });

    if (!menu) return res.status(404).send({ error: errors[404] });

    if (menu.date.toString() < moment().format('YYYY-MM-DD').toString()) {
      return res.status(422).send({ error: 'Menu Expired' });
    }

    req.body.meals = removeDuplicates(req.body.meals);

    await menu.setMeals([], { through: db.MenuMeal });
    const updatedMenu = await menu.setMeals(req.body.meals, { through: db.MenuMeal })
      .then(async () => {
        await Menu.getMealsObject(menu);
        return menu;
      });

    return res.status(200).send(updatedMenu);
  }

  /**
   * Gets meals for the Menu
   * @method getMealsObject
   * @memberof Controller
   * @param {OBJECT} menu
   * @returns {array} Array of Meals
   */
  static async getMealsObject(menu) {
    menu.dataValues.meals = await menu.getMeals({
      attributes: ['mealId', 'title', 'imageURL', 'description', 'forVegetarians', 'price']
    });
  }
}

export default Menu;
