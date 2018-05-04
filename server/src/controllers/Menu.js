import moment from 'moment';
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
  static async getMenuForDay(req, res) {
    const date = req.query.date || moment().format('YYYY-MM-DD');
    const menu = await db.Menu
      .findOne({ where: { date } });

    if (!menu) {
      return res.status(200).send({ message: 'No Menu is Available For This Day' });
    }

    // get full meals object from mealsDB
    const meals = await Menu.getMealObject(menu.meals);
    menu.meals = meals;
    return res.status(200).send(menu);
  }

  /**
   * Creates a new item
   * @method create
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async create(req, res) {
    const defaultDate = moment().format('YYYY-MM-DD');

    // date is either equal to today or given date
    req.body.date = req.body.date || defaultDate;

    // convert meals array string to array and remove duplicates
    req.body.meals = removeDuplicates(req.body.meals);

    const check = await checkMenuUnique(req.body.date, req.body.userId);

    if (!check) {
      return res.status(422).send({ error: 'Menu already exists for this day' });
    }

    const newMenu = await db.Menu.create(req.body, { include: [db.User] });

    // push to notifications table
    // userId is null for all user's
    Notifications.create({
      userId: null,
      orderId: null,
      menuId: req.body.menuId,
      message: 'Rice and Stew with Beef was just added to the menu'
    });

    // get full meals object from mealsDB
    const meals = await Menu.getMealObject(newMenu.meals);
    newMenu.meals = meals;
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

    // return 404 error if index isn't found ie menu doesnt exist
    if (!menu) return res.status(404).send({ error: errors[404] });

    // if menuis expired i.e. menu is past, return error
    if (menu.date.toString() < moment().format('YYYY-MM-DD').toString()) {
      return res.status(422).send({ error: 'Menu Expired' });
    }

    // remove duplicates
    req.body.meals = removeDuplicates(req.body.meals);

    const updatedMenu = await menu.update({ ...menu, ...req.body });

    const meals = await Menu.getMealObject(updatedMenu.meals);
    updatedMenu.meals = meals;
    return res.status(200).send(updatedMenu);
  }

  /**
   * Gets meals from mealsDB with ID
   * @method getMealObject
   * @memberof Controller
   * @param {meals} mealIDArray
   * @returns {array} Array of filled Menu
   */
  static async getMealObject(mealIDArray) {
    const arr = [];
    const getObjs = mealIDArray.map(mealId => db.Meal.findById(mealId).then((meal) => {
      arr.push(meal.dataValues);
    }));

    const objArr = await Promise.all(getObjs).then(() => arr);
    return objArr;
  }
}

export default Menu;
