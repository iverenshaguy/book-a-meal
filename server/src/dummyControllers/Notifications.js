import uuidv4 from 'uuid/v4';
import moment from 'moment';
import GetItems from '../middlewares/GetItems';
import notificationsDB from '../../data/notifications.json';

/**
 * @exports
 * @class Notifications
 */
class Notifications {
  /**
   * lists User's Notifications
   * @method getNotifications
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {object} JSON object
   */
  static getNotifications(req, res) {
    const { role, userId } = req.body;
    const list = role === 'caterer' ?
      notificationsDB.filter(item => item.userId === userId) :
      notificationsDB.filter(item => item.userId === null);
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
    notif.createdAt = moment().format();
    notif.updatedAt = moment().format();

    notificationsDB.push(notif);
  }
}

export default Notifications;
