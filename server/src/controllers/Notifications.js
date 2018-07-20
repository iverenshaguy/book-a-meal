import moment from 'moment';
import { Op } from 'sequelize';
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
   * @returns {void}
   * Generated automatically when some actions are taken
   */
  static async create(messageBody) {
    await db.Notification.create({ ...messageBody }, { include: [db.User, db.Menu, db.Order] });
  }

  /**
   * Returns a list of Order Items
   * @method getNotifications
   * @memberof Notifications
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getNotifications(req, res) {
    const { role } = req;

    const where = role === 'caterer' ?
      { userId: req.userId } :
      { menuId: { [Op.not]: null } };

    let notifications = await db.Notification.findAll({ where });

    notifications = notifications.map(order => Notifications.getNotifObject(order, role));

    return res.status(200).json({ notifications });
  }

  /**
   * @method getNotifObj
   * @memberof Notifications
   * @param {object} notification
   * @param {string} type
   * @return {object} Notification Object
   */
  static getNotifObject(notification, type) {
    return {
      id: notification.notifId,
      message: notification.message,
      menuId: type === 'customer' ? notification.menuId : undefined,
      orderId: type === 'caterer' ? notification.orderId : undefined,
      createdAt: moment(notification.createdAt).format()
    };
  }
}

export default Notifications;
