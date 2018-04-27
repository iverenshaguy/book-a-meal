import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Controller from './Controller';
import GetItems from '../middlewares/GetItems';
import notificationsDB from '../data/notifications.json';

/**
 * @exports
 * @class Notifications
 * @extends Controller
 */
class Notifications extends Controller {
  /**
   * lists User's Notifications
   * @method getNotifications
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {object} JSON object
   */
  static list(req, res, role) {
    // return orders pertaining to user when user query is passed
    // subscriptiton feature can be added to make notif specific to user
    const list = notificationsDB.filter(item => item.type === role);
    return GetItems.items(req, res, list, 'notifications');
  }

  /**
   * @method create
   * @memberof Notifications
   * @param {object} notif
   * @return {nothing} Nothing
   */
  static create(notif) {
    notif.notifId = uuidv4();
    notif.created = moment().format();
    notif.updated = moment().format();
    notif.isRead = false;

    notificationsDB.push(notif);
  }
}

export default Notifications;
