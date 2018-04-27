import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Controller from './Controller';
import Menu from './Menu';
import errors from '../helpers/errors.json';
import menuDB from '../dummyData/menu';
import trimValues from '../helpers/trimValues';
import isMenuAvailable from '../helpers/isMenuAvailable';

/**
 * @exports
 * @class Orders
 * @extends Controller
 */
class Orders extends Controller {
  /**
   * Creates a new item
   * @method create
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  create(req, res, data) {
    if (!isMenuAvailable(data.menuId)) {
      res.status(422).send({ error: 'Menu is Unavailable' });
    }

    const trimmedData = trimValues(data);
    // generate random id
    trimmedData[`${this.type}Id`] = uuidv4();

    // fake userId, original to be gotten from jwt
    trimmedData.userId = 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';

    // generate created date
    trimmedData.created = moment().format();
    trimmedData.updated = moment().format();

    // default quantity is 1
    trimmedData.quantity = parseInt(trimmedData.quantity, 10) || 1;

    // update DB
    this.database.push(trimmedData);

    return Orders.getOrderObject(res, trimmedData, 201);
  }

  /**
   * Creates a new item
   * @method update
   * @memberof Orders
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  update(req, res, data) {
    const itemIndex = this.database.findIndex(item => item.orderId === req.params.orderId);

    // return 404 error if index isn't found ie order doesnt exist
    if (itemIndex === -1) {
      return res.status(404).send({ error: errors[404] });
    }

    if (!isMenuAvailable(data.menuId)) {
      res.status(422).send({ error: 'Menu is Unavailable' });
    }

    // get menu from menu db and check to ensure that order is not expired
    // order is expired when the day passes
    const menu = menuDB.find(item => item.menuId === this.database[itemIndex].menuId);
    const currentDate = moment().format('YYYY-MM-DD');

    if (moment(currentDate).isAfter(menu.date)) {
      return res.status(422).send({ error: 'Order is Expired' });
    }

    const trimmedData = trimValues(data);
    // update date
    trimmedData.updated = moment().format();
    // real userId to be gotten from decoded token
    trimmedData.userId = 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';

    const oldOrder = this.database[itemIndex];

    // update db
    this.database[itemIndex] = Object.assign({}, oldOrder, trimmedData);

    return Orders.getOrderObject(res, this.database[itemIndex], 200);
  }

  /**
   * Generated Order Object to be Returned as Response
   * @method getOrderObject
   * @memberof Orders
   * @param {object} res
   * @param {object} order
   * @param {number} statusCode
   * @returns {object} JSON object
   */
  static getOrderObject(res, order, statusCode) {
    const newOrder = Object.assign({}, order);

    // get menu from menuDB through menuId and replace ids with real meals
    const menuObj = menuDB.find(menu => menu.menuId === newOrder.menuId);
    menuObj.meals = Menu.getMealObject(menuObj.meals);

    newOrder.menu = menuObj;

    return res.status(statusCode).send(newOrder);
  }
}

export default Orders;
