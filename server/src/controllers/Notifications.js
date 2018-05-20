// import moment from 'moment';
import db from '../models';

/**
 * @exports
 * @class Notifications
 */
class Notifications {
  /**
   * Creates a New Notification
   * @method create
   * @memberof Notifications
   * @param {object} messageBody
   * @returns {nothing} Returns nothing
   * Generated automatically when some actions are taken
   */
  static async create(messageBody) {
    await db.Notification.create({ ...messageBody }, { include: [db.User, db.Menu, db.Order] });
  }

  // /**
  //  * @method getNotificationObj
  //  * @memberof Notifications
  //  * @param {object} notification
  //  * @return {object} Notification Object
  //  */
  // static getNotificationObj(notification) {
  //   return {
  //     id: notification.notifId,
  //     message: notification.message,
  //     read: notification.read,
  //     createdAt: moment(notification.createdAt).format(),
  //     email: notification.email,
  //   };
  // }
}

export default Notifications;
