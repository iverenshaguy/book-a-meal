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
   * @method notifyAllUsers
   * @memberof Notifications
   * @param {object} menu
   * @param {string} catererId
   * @returns {nothing} returns nothing
   */
  static notifyAllUsers(menu, catererId) {
    return db.User.findOne({ where: { userId: catererId } }).then((user) => {
      const meals = menu.meals.map(meal => meal.title);
      const message = `${user.businessName} just added ${meals.join(', ')} to their Menu for the day`;
      return NotifController.create({ message, menuId: menu.id }).then(() => {
        Mailer.menuMail(meals, user.businessName);
      });
    });
  }

  // /**
  //  * Notifies User when an order has been placed by the User
  //  * @method notifyUser
  //  * @memberof Notifications
  //  * @returns {nothing} returns nothing
  //  */
  // static notifyUser() {
  // }

  // /**
  //  * Notifies Caterer when Caterer's meal has been ordered
  //  * @method notifyCaterer
  //  * @memberof Notifications
  //  * @returns {nothing} returns nothing
  //  */
  // static notifyCaterer() {
  // }
}

export default Notifications;
