import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Controller from './Controller';
import notificationsDB from '../data/notifications.json';

/**
 * @exports
 * @class Notifications
 * @extends Controller
 */
class Notifications extends Controller {
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
