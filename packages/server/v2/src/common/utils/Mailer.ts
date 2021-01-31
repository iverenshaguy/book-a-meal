import * as nodemailer from 'nodemailer';
import passwordReset from './emailTemplates/passwordReset';
import passwordResetSuccess from './emailTemplates/passwordResetSuccess';

/**
 * Mailer Event Emitter
 * @exports
 * @class Mailer
 * @extends EventEmitter
 */
class Mailer {

  static url = process.env.BASE_URL;

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
      /* @ts-ignore */
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_POST,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: '"Book A Meal" <noreply@book-a-meal-sivy.com>',
      to,
      cc: ['bookamealsivy@gmail.com', process.env.PERSONAL_EMAIL],
      subject,
      html: message
    };

    transporter.sendMail(mailOptions);
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
    const message = passwordReset(process.env.BASE_URL, token, emailAddress);

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
    const message = passwordResetSuccess(process.env.BASE_URL);

    return Mailer.sendMail({
      to: emailAddress,
      subject: 'Book-A-Meal: Password Reset Successful',
      message
    });
  }
}

export default Mailer;
