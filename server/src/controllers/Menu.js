import moment from 'moment';
import db from '../models';
import errors from '../../data/errors.json';
import notifEmitter from '../events/Notifications';

/**
 * @exports
 * @class Menu
 */
class Menu {
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

    await db.Menu.findOrCreate({
      where: { date: req.body.date, userId },
      defaults: { date: req.body.date, userId },
      attributes: [['menuId', 'id'], 'date'],
      include: [{
        model: db.User,
        as: 'caterer'
      }]
    }).spread(async (menu, created) => {
      if (!created) return res.status(400).json({ error: 'Menu already exists for this day' });

      await menu.setMeals(req.body.meals, { through: db.MenuMeal });
      await Menu.getArrayOfMeals(menu);

      const newMenu = Menu.getMenuObject(menu);

      if (req.body.date === moment().format('YYYY-MM-DD')) {
        notifEmitter.emit('createMenu', newMenu, req.userId);
      }

      return res.status(201).json(newMenu);
    });
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

        return Menu.getMenuObject(menu);
      });

    notifEmitter.emit('createMenu', updatedMenu, req.userId);

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
  static async getMenuForDay(req, res) {
    const { role } = req;

    if (role === 'caterer') return Menu.getMenuForCaterer(req, res);
    return Menu.getMenuForCustomer(req, res);
  }

  /**
   * Gets the menu for the day
   * @method getMenuForCustomer
   * @memberof Meals
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getMenuForCustomer(req, res) {
    const date = moment().format('YYYY-MM-DD');

    const menu = await db.Menu.findAll({
      where: { date },
      attributes: [['menuId', 'id']],
      include: [
        {
          model: db.User,
          as: 'caterer',
          attributes: [['userId', 'id'], 'businessName', 'businessPhoneNo', 'businessAddress', 'email'],
        },
        {
          model: db.Meal,
          as: 'meals',
          attributes: [['mealId', 'id'], 'title', 'imageURL', 'description', 'vegetarian', 'price'],
          through: {
            attributes: []
          }
        }
      ]
    });

    return res.status(200).json({ menu });
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

    const menu = await db.Menu.findOne({
      where: { date, userId: req.userId },
      attributes: [['menuId', 'id'], 'date'],
      include: [{
        model: db.Meal,
        as: 'meals',
        attributes: [['mealId', 'id'], 'title', 'imageURL', 'description', 'vegetarian', 'price'],
        through: {
          attributes: []
        }
      }]
    });

    if (!menu) {
      return res.status(200).json({ date, meals: [] });
    }

    return res.status(200).json(menu);
  }

  /**
   * Gets menu object for created and updated menu
   * @method getMenuObject
   * @memberof Controller
   * @param {object} menu
   * @returns {object} Menu object
   */
  static getMenuObject(menu) {
    return {
      id: menu.getDataValue('menuId'),
      date: moment(menu.getDataValue('date')).format('YYYY-MM-DD'),
      meals: menu.dataValues.meals
    };
  }

  /**
   * Gets meals for the Menu
   * @method getArrayOfMeals
   * @memberof Controller
   * @param {object} menu
   * @returns {array} Array of Meals
   */
  static async getArrayOfMeals(menu) {
    menu.dataValues.meals = await menu.getMeals({
      attributes: [['mealId', 'id'], 'title', 'imageURL', 'description', 'vegetarian', 'price'],
      joinTableAttributes: []
    });
  }
}

export default Menu;
