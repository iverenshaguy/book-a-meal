import models from '../models';
import NotificationController from '../controllers/NotificationController';
import Mailer from '../utils/Mailer';

/**
 * NotificationEventHandler Event Handlers
 * @exports
 * @class NotificationEventHandler
 */
class NotificationEventHandler {
  /**
   * Notifies all Users when the Menu for the day is created/updated
   * @method menuForTheDay
   * @memberof NotificationEventHandler
   * @param {object} menu
   * @param {string} catererId
   * @returns {void}
   */
  static menuForTheDay(menu, catererId) {
    return models.User.findOne({ where: { userId: catererId } }).then((user) => {
      const meals = menu.meals.map(meal => meal.title);
      const message = `${user.businessName} just added ${meals.join(', ')} to their Menu for the day`;
      return NotificationController.create({ message, menuId: menu.id }).then(() => {
        Mailer.menuMail(meals, user.businessName);
      });
    });
  }

  /**
   * Notifies Caterer when Caterer's meal has been ordered
   * @method catererOrder
   * @memberof NotificationEventHandler
   * @param {object} order
   * @param {string} userId
   * @returns {func} Mailer
   */
  static catererOrder(order, userId) {
    models.User.findOne({ where: { userId } }).then((user) => {
      Object.entries(order.meals).forEach(([catererId, mealArray]) => {
        const meals = mealArray.map(meal => meal.title);
        const message = `${user.firstname} ${user.lastname} just ordered meal(s); ${meals.join(', ')}.`;
        return NotificationController.create({ message, orderId: order.orderId, userId: catererId })
          .then(() => {
            Mailer.catererOrderMail(order, user, catererId);
          });
      });
    });
  }

  /**
   * Notifies Customer when order is successfully completed
   * @method orderSuccess
   * @memberof NotificationEventHandler
   * @param {object} order
   * @param {array} meals
   * @returns {func} Mailer
   */
  static orderSuccess(order, meals) {
    return Mailer.customerOrderMail(order, meals);
  }
}

export default NotificationEventHandler;
