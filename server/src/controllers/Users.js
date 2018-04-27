import uuidv4 from 'uuid/v4';
import moment from 'moment';
import usersDB from '../data/users.json';
import ordersDB from '../data/orders.json';
import GetItems from '../middlewares/GetItems';
import PasswordHash from '../helpers/PasswordHash';
import notificationsDB from '../data/notifications.json';

const token = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';

/**
 * @exports
 * @class Users
 */
class Users {
  /**
   * Registers a new user
   * @method register
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  static async register(req, res, data) {
    // encrypt password
    const hash = await PasswordHash.hashPassword(req.body.password);
    const newUser = Object.assign({}, data);
    newUser.passwordHash = hash;
    newUser.email = req.body.email.toLowerCase();
    newUser.userId = uuidv4();
    delete newUser.password;
    delete newUser.passwordConfirm;
    newUser.created = moment().format();
    newUser.updated = moment().format();

    usersDB.push(newUser);

    delete newUser.passwordHash;

    res.status(201).send({
      user: newUser,
      token
    });
  }

  /**
   * Logs in a user
   * @method login
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  static login(req, res, data) {
    const authUser = usersDB
      .find(user => user.email === data.email && user.password === data.password);

    if (!authUser) {
      return res.status(401).send({
        error: 'Invalid Credentials'
      });
    }

    const user = Object.assign({}, authUser);

    delete user.password;
    delete user.passwordHash;

    return res.status(200).send({ user, token });
  }

  /**
   * lists User's Orders
   * @method getOrders
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {object} JSON object
   */
  static getOrders(req, res) {
    // return orders pertaining to user when user query is passed
    const { userId } = req.params;
    const list = ordersDB.filter(item => item.userId === userId);
    return GetItems.items(req, res, list, 'orders');
  }

  /**
   * lists User's Notifications
   * @method getNotifications
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {object} JSON object
   */
  static getNotifications(req, res) {
    // return orders pertaining to user when user query is passed
    const { userId } = req.params;
    const list = notificationsDB.filter(item => item.userId === userId);
    return GetItems.items(req, res, list, 'notifications');
  }
}

export default Users;
