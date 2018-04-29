import uuidv4 from 'uuid/v4';
import Controller from './Controller';
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
