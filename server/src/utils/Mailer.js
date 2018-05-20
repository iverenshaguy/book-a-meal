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
   * @returns {nothing} returns nothing
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
   * Sends Mail
   * @method menuMail
   * @memberof Mailer
   * @param {array} meals
   * @param {string} businessName
   * @returns {nothing} returns nothing
   */
  static menuMail(meals, businessName) {
    return db.User.findAll({ where: { role: 'customer' }, attributes: ['firstname', 'email'] })
      .then((customers) => {
        customers.forEach((customer) => {
          const mealList = meals.map(meal => `<li>${meal}</li>`);
          const message =
            `<div>
            <p style="text-transform: capitalize;">Hello ${customer.firstname},</p>
            <p>${businessName} just added the following meals to the menu for today</p>
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
}

export default Mailer;
