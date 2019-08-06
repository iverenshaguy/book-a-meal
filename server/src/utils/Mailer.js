import nodemailer from 'nodemailer';
import models from '../models';
import newMenu from '../emailTemplates/newMenu';
import newOrder from '../emailTemplates/newOrder';
import orderDelivery from '../emailTemplates/orderDelivery';
import passwordReset from '../emailTemplates/passwordReset';
import passwordResetSuccess from '../emailTemplates/passwordResetSuccess';

const url = process.env.BASE_URL;

/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
class Mailer {
  /**
   * Sends Mail
   * @method sendMail
   * @memberof Mailer
   * @param {string} to
   * @param {string} subject
   * @param {string} message
   * @returns {void}
   */
  static sendMail({ to, subject, message }) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: '"Book A Meal" <noreply@book-a-meal-sivy.com>',
      to,
      cc: 'bookamealsivy@gmail.com',
      subject,
      html: message
    };

    transporter.sendMail(mailOptions);
  }

  /**
   * Sends Mail to Customer when Caterer adds the order for the day
   * @method menuMail
   * @memberof Mailer
   * @param {array} meals
   * @param {string} businessName
   * @returns {void}
   */
  static menuMail(meals, businessName) {
    return models.User.findAll({ where: { role: 'customer' }, attributes: ['firstname', 'email'] })
      .then((customers) => {
        customers.forEach((customer) => {
          const mealList = meals.map(meal => `<li>${meal}</li>`);

          const message = newMenu({
            customer, mealList, businessName, url
          });

          return Mailer.sendMail({
            to: customer.email,
            subject: `Book-A-Meal: ${businessName}'s Menu for Today`,
            message
          });
        });
      });
  }

  /**
   * Sends Mail to Caterer when an order is placed
   * @method catererOrderMail
   * @memberof Mailer
   * @param {object} order
   * @param {object} customer
   * @param {string} catererId
   * @returns {void}
   */
  static catererOrderMail(order, customer, catererId) {
    return models.User.findOne({ where: { userId: catererId }, attributes: ['userId', 'businessName', 'email'] })
      .then((caterer) => {
        const mealList = order.meals[catererId].map(meal => `<tr><td>${meal.title}</td><td>${meal.OrderItem.quantity}</td><td>&#8358;${meal.price}</td></tr>`);

        const totalPrice = order.meals[catererId]
          .reduce((total, meal) => total + (meal.price * meal.OrderItem.quantity), 0);

        const message = newOrder({
          caterer, customer, order, url, mealList, totalPrice
        });

        return Mailer.sendMail({
          to: caterer.email,
          subject: `Book-A-Meal: Order #${order.orderId}`,
          message
        });
      });
  }

  /**
   * Sends Mail to Customer when an order is successfully completed
   * @method customerOrderMail
   * @memberof Mailer
   * @param {object} order
   * @param {array} meals
   * @returns {void}
   */
  static customerOrderMail(order, meals) {
    return models.User.findOne({ where: { userId: order.userId } })
      .then((customer) => {
        const mealList = meals.map(meal => `<tr><td>${meal.title}</td><td>${meal.OrderItem.quantity}</td><td>&#8358;${meal.price}</td></tr>`);
        const totalPrice = meals
          .reduce((total, meal) => total + (meal.price * meal.OrderItem.quantity), 0);

        const message = orderDelivery({
          customer, mealList, totalPrice, order
        });

        return Mailer.sendMail({
          to: customer.email,
          subject: `Book-A-Meal: Order #${order.orderId}`,
          message
        });
      });
  }

  /**
   * Sends Mail for user to use to reset his password
   * @method forgotPasswordMail
   * @memberof Mailer
   * @param {string} token
   * @param {string} emailAddress
   * @returns {void}
   */
  static forgotPasswordMail(token, emailAddress) {
    const message = passwordReset(url, token, emailAddress);

    return Mailer.sendMail({
      to: emailAddress,
      subject: 'Book-A-Meal: Reset Password',
      message
    });
  }

  /**
   * Sends Mail after user succesfully reset his password
   * @method resetPasswordMail
   * @memberof Mailer
   * @param {string} emailAddress
   * @returns {void}
   */
  static resetPasswordMail(emailAddress) {
    const message = passwordResetSuccess(url);

    return Mailer.sendMail({
      to: emailAddress,
      subject: 'Book-A-Meal: Password Reset Successful',
      message
    });
  }
}

export default Mailer;
