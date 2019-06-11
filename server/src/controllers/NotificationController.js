import moment from 'moment';
import { Op } from 'sequelize';
import models from '../models';
import Pagination from '../utils/Pagination';

/**
 * @exports
 * @class NotificationController
 */
class NotificationController {
  /**
   * Creates a New Notification
   * @method create
   * @memberof NotificationController
   * @param {object} messageBody
   * @returns {void}
   * Generated automatically when some actions are taken
   */
  static async create(messageBody) {
    await models.Notification.create({
      ...messageBody
    }, { include: [models.User, models.Menu, models.Order] });
  }

  /**
   * Returns a list of Notifications
   * @method getNotifications
   * @memberof NotificationController
   * @param {object} req
   * @param {object} res
   * @param {string} role
   * @returns {(function|object)} Function next() or JSON object
   */
  static async getNotifications(req, res) {
    const { role, userId } = req;
    const paginate = new Pagination(req.query.page, req.query.limit);
    const { limit, offset } = paginate.getQueryMetadata();

    const where = role === 'caterer' ?
      { userId } :
      { menuId: { [Op.not]: null } };

    const notifData = await models.Notification.findAndCountAll({
      where, order: [['createdAt', 'DESC']], limit, offset
    });

    const notifications = notifData.rows.map(order =>
      NotificationController.getNotifObject(order, role));

    return res.status(200).json({
      notifications, metadata: paginate.getPageMetadata(notifData.count, '/notifications')
    });
  }

  /**
   * Maps notifications to readable object
   * @method getNotifObj
   * @memberof NotificationController
   * @param {object} notification
   * @param {string} type
   * @return {object} Notification Object
   */
  static getNotifObject(notification, type) {
    const {
      notifId, message, menuId, orderId, createdAt
    } = notification;

    return {
      id: notifId,
      message,
      menuId: type === 'customer' ? menuId : undefined,
      orderId: type === 'caterer' ? orderId : undefined,
      createdAt: moment(createdAt).format()
    };
  }
}

export default NotificationController;
