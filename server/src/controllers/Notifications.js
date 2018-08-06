import moment from 'moment';
import { Op } from 'sequelize';
import db from '../models';
import Pagination from '../utils/Pagination';

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
   * Returns a list of Notifications
   * @method getNotifications
   * @memberof Notifications
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getNotifications(req, res) {
    const { role } = req;
    const paginate = new Pagination(req.query.page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();

    const where = role === 'caterer' ?
      { userId: req.userId } :
      { menuId: { [Op.not]: null } };

    const data = await db.Notification.findAndCountAll({
      where, order: [['createdAt', 'DESC']], limit, offset
    });

    const notifications = data.rows.map(order => Notifications.getNotifObject(order, role));

    const url = '/notifications';

    return res.status(200).json({
      notifications, metadata: paginate.getPageMetadata(data.count, url)
    });
  }

  /**
   * Maps notifications to readable object
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
