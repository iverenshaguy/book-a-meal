import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import db from '../models';

config();
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
    return db.User.findAll({ where: { role: 'customer' }, attributes: ['firstname', 'email'] })
      .then((customers) => {
        customers.forEach((customer) => {
          const mealList = meals.map(meal => `<li>${meal}</li>`);
          const message =
            `<div>
            <p style="text-transform: capitalize;">Hello ${customer.firstname},</p>
            <p>${businessName} just added the following meal(s) to the menu for today</p>
            <ul>
            ${mealList.join('')}
            </ul>
            <p>You can order now at <a href='http://${url}/menu'>Book A Meal</a></p>
            <p>Have a great day.</p>
            </div>`;

          return Mailer.sendMail({
            to: customer.email,
            subject: `${businessName}'s Menu for Today`,
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
    return db.User.findOne({ where: { userId: catererId }, attributes: ['userId', 'businessName', 'email'] })
      .then((caterer) => {
        const mealList = order.meals[catererId].map(meal =>
          `<tr><td>${meal.title} (${meal.OrderItem.quantity})</td><td>&#8358;${meal.price}</td></tr>`);
        const totalPrice = order.meals[catererId].reduce((total, meal) =>
          total + (meal.price * meal.OrderItem.quantity), 0);
        const message =
            `<div>
            <p style="text-transform: capitalize;">Hello ${caterer.businessName},</p>
            <p>${customer.firstname} ${customer.lastname} just ordered your meal(s).</p>
            <p>Order Details: </p>
            <table>
            <tbody>
              ${mealList.join('')}
            </tbody>
            <tfoot><tr><th></th><th>&#8358;${totalPrice}</th></tr></tfoot>
            </table>
            <p>See your <a href='http://${url}/${caterer.userId}/orders'>order details</a></p>
            <p>Remember that a happy customer keeps coming back.</p>
            <p>Have a great day filling bellies.</p>
            </div>`;

        return Mailer.sendMail({
          to: caterer.email,
          subject: `Order #${order.orderId}`,
          message
        });
      });
  }

  /**
   * Sends Mail for user to use to reset his password
   * @method forgotPasswordMail
   * @memberof Mailer
   * @param {string} token
   * @param {string} email
   * @returns {void}
   */
  static forgotPasswordMail(token, email) {
    const message =
      `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>You recently requested to reset your password. If this wasn't you, please ignore this mail.</p>
      <p>You can click on or copy this link: <a href='http://${url}/reset_password?token=${token}'>
      http://${url}/reset_password?token=${token}</a> to reset your password</p>
      <p>This link expires in 1 hour.</p>
      <p>Have a great day.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Reset Password',
      message
    });
  }

  /**
   * Sends Mail after user succesfully reset his password
   * @method resetPasswordMail
   * @memberof Mailer
   * @param {string} email
   * @returns {void}
   */
  static resetPasswordMail(email) {
    const message =
      `<div>
      <p style="text-transform: capitalize;">Hi,</p>
      <p>Your password was reset succesfully.</p>
      <p><a href='http://${url}/signin'>Login</a> to your account.</p>
      </div>`;

    return Mailer.sendMail({
      to: email,
      subject: 'Password Reset Successful',
      message
    });
  }
}

export default Mailer;
