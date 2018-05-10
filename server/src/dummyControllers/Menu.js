import moment from 'moment';
import menuDB from '../../data/menu.json';
import mealsDB from '../../data/meals.json';
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
      return res.status(200).json({ message: 'No Menu is Available For This Day' });
    }

    const menu = { ...menuForTheDay };
    menu.meals = Menu.getMealObject(menu.meals);

    return res.status(200).json(menu);
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

    req.body.date = req.body.date || defaultDate;
    req.body.meals = removeDuplicates(req.body.meals);


    if (!checkMenuUnique(req.body.date, req.body.userId)) {
      return res.status(422).json({ error: 'Menu already exists for this day' });
    }

    menuDB.push(req.body);

    Notifications.create({
      userId: null,
      orderId: null,
      menuId: req.body.menuId,
      message: 'Rice and Stew with Beef was just added to the menu'
    });

    const fullData = { ...req.body };
    fullData.meals = Menu.getMealObject(fullData.meals);

    return res.status(201).json(req.body);
  }

  /**
   * Updates an existing item
   * @method update
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static update(req, res) {
    const itemIndex = menuDB
      .findIndex(item => item.menuId === req.params.menuId &&
      item.userId === req.body.userId);

    if (itemIndex === -1) return res.status(404).json({ error: errors[404] });

    // return meal item if no data was sent ie req.body is only populated with userId && role
    if (Object.keys(req.body).length === 2) {
      const unEditedMenu = menuDB[itemIndex];
      unEditedMenu.meals = Menu.getMealObject(unEditedMenu.meals);

      return res.status(200).json(unEditedMenu);
    }

    // if menuis expired i.e. menu is past, return error
    if (menuDB[itemIndex].date.toString() < moment().format('YYYY-MM-DD').toString()) {
      return res.status(422).json({ error: 'Menu Expired' });
    }

    const oldItem = menuDB[itemIndex];

    delete req.body.menuId;
    req.body.meals = removeDuplicates(req.body.meals);
    req.body.date = oldItem.date;
    req.body.updatedAt = moment().format();

    menuDB[itemIndex] = { ...oldItem, ...req.body };

    const fullData = { ...menuDB[itemIndex] };
    fullData.meals = Menu.getMealObject(fullData.meals);

    return res.status(200).json(fullData);
  }

  /**
   * Gets meals from mealsDB with ID
   * @method getMealObject
   * @memberof Controller
   * @param {meals} mealIDArray
   * @returns {array} Array of filled Menu
   */
  static getMealObject(mealIDArray) {
    return mealIDArray.map(mealID => mealsDB.find(mealItem => mealItem.mealId === mealID));
  }
}

export default Menu;
