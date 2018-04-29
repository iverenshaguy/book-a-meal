import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Controller from './Controller';
import errors from '../helpers/errors.json';
import stringToArray from '../helpers/stringToArray';
import mealsDB from '../dummyData/meals';

/**
 * @exports
 * @class Menu
 * @extends Controller
 */
class Menu extends Controller {
  /**
   * Creates a new item
   * @method create
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  create(req, res, data) {
    // generate random id
    data[`${this.type}Id`] = uuidv4();

    // convert meals array string to array
    data.meals = stringToArray(data.meals);

    this.database.push(data);

    // get full meals object from mealsDB
    const fullData = Object.assign(data);
    fullData.meals = Menu.getMealObject(fullData.meals);

    return res.status(201).send(fullData);
  }

  /**
   * Updates an existing item
   * @method update
   * @memberof Controller
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  update(req, res, data) {
    const itemIndex = this.database
      .findIndex(item => item[`${this.type}Id`] === req.params[`${this.type}Id`]);

    // return 404 error if index isn't found ie meal option doesnt exist
    if (itemIndex === -1) {
      return res.status(404).send({ error: errors[404] });
    }

    if (this.database[itemIndex].date.toString() < moment().format().toString()) {
      return res.status(422).send({ error: 'Menu Expired' });
    }

    const oldItem = this.database[itemIndex];

    // convert meals array string to array
    data.meals = stringToArray(data.meals);

    // delete id and replace date from data
    delete data.menuId;

    data.date = oldItem.date;

    // update old meal with new meal and assign it to it's position in the array
    this.database[itemIndex] = Object.assign(oldItem, data);

    // get full meals object from mealsDB
    const fullData = Object.assign(this.database[itemIndex]);
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
