import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Controller from './Controller';
import Menu from './Menu';
import menuDB from '../dummyData/menu';
import trimValues from '../helpers/trimValues';

/**
 * @exports
 * @class Orders
 * @extends Controller
 */
class Orders extends Controller {
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
    const trimmedData = trimValues(data);
    // generate random id
    trimmedData[`${this.type}Id`] = uuidv4();

    // fake user id gotten from token
    trimmedData.userId = 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';

    // generate created date
    trimmedData.created = moment().format();
    trimmedData.updated = moment().format();

    // default quantity is 1
    trimmedData.quantity = parseInt(trimmedData.quantity, 10) || 1;

    // get menu item from Menu Controller
    this.database.push(trimmedData);

    const newOrder = Object.assign({}, trimmedData);

    // get menu from menuDB through menuId and replace ids with real meals
    const menuObj = menuDB.find(menu => menu.menuId === newOrder.menuId);
    menuObj.meals = Menu.getMealObject(menuObj.meals);

    newOrder.menu = menuObj;

    return res.status(201).send(newOrder);
  }
}

export default Orders;
