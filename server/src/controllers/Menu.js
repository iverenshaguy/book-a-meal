import uuidv4 from 'uuid/v4';
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
      return res.status(200).send({ message: 'No Menu is Available For This Day' });
    }

    // get meal object for each meal ID
    const menu = { ...menuForTheDay };
    menu.meals = Menu.getMealObject(menu.meals);

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
  static create(req, res) {
    const defaultDate = moment().format('YYYY-MM-DD');
    const today = moment().format();

    // generate random id
    req.body.menuId = uuidv4();

    // date is either equal to today or given date
    req.body.date = req.body.date || defaultDate;

    // convert meals array string to array and remove duplicates
    req.body.meals = removeDuplicates(req.body.meals);

    // add dates
    req.body.created = today;
    req.body.updated = today;

    if (!checkMenuUnique(req.body.date, req.body.userId)) {
      return res.status(422).send({
        errors: {
          date: {
            location: 'body',
            param: 'date',
            value: req.body.date,
            msg: 'Menu already exists for this day'
          }
        }
      });
    }

    menuDB.push(req.body);

    // push to notifications table
    // userId is null for all user's
    Notifications.create({
      userId: null,
      orderId: null,
      menuId: req.body.menuId,
      message: 'Rice and Stew with Beef was just added to the menu'
    });

    // get full meals object from mealsDB
    const fullData = { ...req.body };
    fullData.meals = Menu.getMealObject(fullData.meals);

    return res.status(201).send(fullData);
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

    // return 404 error if index isn't found ie menu doesnt exist
    if (itemIndex === -1) return res.status(404).send({ error: errors[404] });

    // return meal item if no data was sent ie req.body is only poulated with userId && role
    if (Object.keys(req.body).length === 2) {
      const unEditedMenu = menuDB[itemIndex];
      unEditedMenu.meals = Menu.getMealObject(unEditedMenu.meals);

      return res.status(200).send(unEditedMenu);
    }

    // if menuis expired i.e. menu is past, return error
    if (menuDB[itemIndex].date.toString() < moment().format('YYYY-MM-DD').toString()) {
      return res.status(422).send({ error: 'Menu Expired' });
    }

    const oldItem = menuDB[itemIndex];

    // remove duplicates
    req.body.meals = removeDuplicates(req.body.meals);

    // delete id and replace date and updated from req.body
    delete req.body.menuId;
    req.body.date = oldItem.date;
    req.body.updated = moment().format();

    // update old meal with new meal and assign it to it's position in the array
    menuDB[itemIndex] = { ...oldItem, ...req.body };

    // get full meals object from mealsDB
    const fullData = { ...menuDB[itemIndex] };
    fullData.meals = Menu.getMealObject(fullData.meals);

    return res.status(200).send(fullData);
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
