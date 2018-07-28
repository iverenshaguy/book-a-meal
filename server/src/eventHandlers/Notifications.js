import db from '../models';
import NotifController from '../controllers/Notifications';
import Mailer from '../utils/Mailer';

/**
 * Notifications Event Handlers
 * @exports
 * @class Notifications
 */
class Notifications {
  /**
   * Notifies all Users when the Menu for the day is created/updated
   * @method menuForTheDay
   * @memberof Notifications
   * @param {object} menu
   * @param {string} catererId
   * @returns {void}
   */
  static menuForTheDay(menu, catererId) {
    return db.User.findOne({ where: { userId: catererId } }).then((user) => {
      const meals = menu.meals.map(meal => meal.title);
      const message = `${user.businessName} just added ${meals.join(', ')} to their Menu for the day`;
      return NotifController.create({ message, menuId: menu.id }).then(() => {
        Mailer.menuMail(meals, user.businessName);
      });
    });
  }

  /**
   * Notifies Caterer when Caterer's meal has been ordered
   * @method catererOrder
   * @memberof Notifications
   * @param {object} order
   * @param {string} userId
   * @returns {func} Mailer
   */
  static catererOrder(order, userId) {
    db.User.findOne({ where: { userId } }).then((user) => {
      Object.entries(order.meals).forEach(([catererId, mealArray]) => {
        const meals = mealArray.map(meal => meal.title);
        const message = `${user.firstname} ${user.lastname} just ordered meal(s); ${meals.join(', ')}.`;
        return NotifController.create({ message, orderId: order.orderId, userId: catererId })
          .then(() => {
            Mailer.catererOrderMail(order, user, catererId);
          });
      });
    });
  }

  /**
   * Notifies Customer when order is successfully completed
   * @method orderSuccess
   * @memberof Notifications
   * @param {object} order
   * @param {array} meals
   * @returns {func} Mailer
   */
  static orderSuccess(order, meals) {
    return Mailer.customerOrderMail(order, meals);
  }
}

export default Notifications;
