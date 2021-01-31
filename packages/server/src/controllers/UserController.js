/* eslint-disable import/no-cycle */
import bcrypt from 'bcrypt';
import randomString from 'random-string';
import { Op } from 'sequelize';
import Authorization from '../middlewares/Authorization';
import models from '../models';
import Mailer from '../utils/Mailer';

/**
 * @exports
 * @class UserController
 */
class UserController {
  /**
   * Registers a new user
   * @method register
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async register(req, res) {
    const {
      role,
      businessName,
      firstname,
      lastname,
      password,
      phoneNo,
      address,
      email,
    } = req.body;

    if (role === 'caterer') {
      const businessNameExists = await models.User.findOne({
        where: { businessName: { [Op.iLike]: businessName } }
      });

      if (businessNameExists) return res.status(409).send({ error: 'Business name already in use' });
    }

    await models.User.findOrCreate({
      where: { email: { [Op.iLike]: email } },
      defaults: {
        firstname,
        lastname,
        businessName,
        email: email.toLowerCase(),
        password,
        phoneNo,
        address,
        role
      }
    }).then(([newUser, created]) => {
      if (!created) return res.status(409).send({ error: 'Email already in use' });

      const user = UserController.getUserObj({ ...newUser.get() });
      const token = Authorization.generateToken(user);

      return res.status(201).json({ user, token });
    });
  }

  /**
   * Logs in a user
   * @method login
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static login(req, res) {
    return models.User.findOne({ where: { email: req.body.email } }).then(async (authUser) => {
      if (!authUser) return res.status(401).json({ error: 'Invalid Credentials' });

      const isPasswordValid = await UserController
        .verifyPassword(req.body.password, authUser.password);

      if (!isPasswordValid) return res.status(401).json({ error: 'Invalid Credentials' });

      const user = UserController.getUserObj({ ...authUser.get() });
      const token = Authorization.generateToken(user);

      return res.status(200).json({ user, token });
    });
  }

  /**
   * @method verifyPassword
   * @memberof UserController
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Sends password token to user
   * @method forgotPassword
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async forgotPassword(req, res) {
    const { email } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'This user is not registered on the platform, please signup instead' });

    const token = randomString({ length: 40 });

    await user.update({
      passwordResetToken: token,
      passwordTokenExpiry: Date.now() + 3600000 // 1 hour from now
    });

    await Mailer.forgotPasswordMail(token, email);

    return res.status(200).json({ message: 'A reset token has been sent to your email address' });
  }

  /**
   * Sends password token to user
   * @method resetPassword
   * @memberof UserController
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async resetPassword(req, res) {
    const { password } = req.body;
    const { email, token } = req.query;

    const user = await models.User.findOne({
      where: {
        passwordResetToken: token,
        passwordTokenExpiry: {
          [Op.gt]: Date.now()
        }
      }
    });

    if (!user) return res.status(400).send({ error: 'Password reset token is invalid or has expired' });

    await user.update({
      password,
      passwordResetToken: null,
      passwordTokenExpiry: null,
    });

    await Mailer.resetPasswordMail(email);

    return res.status(200).json({ message: 'Password reset successful' });
  }

  /**
   * Updates Customer's contact details
   * @method updateCustomerContact
   * @memberof Orders
   * @param {string} userId
   * @param {object} contact
   * @returns {void}
   */
  static async updateCustomerContact(userId, { deliveryPhoneNo, deliveryAddress }) {
    await models.User.update(
      { phoneNo: deliveryPhoneNo, address: deliveryAddress },
      { where: { userId } }
    );
  }

  /**
   * @method getUserObj
   * @memberof UserController
   * @param {object} user
   * @return {object} User Object
   */
  static getUserObj(user) {
    let userObj;
    const {
      firstname,
      userId,
      lastname,
      address,
      phoneNo,
      email,
      role,
      businessName,
    } = user;

    if (role === 'customer' || role === 'admin') {
      userObj = {
        id: userId,
        firstname,
        lastname,
        address,
        phoneNo,
        email,
        role
      };
    }

    if (role === 'caterer') {
      userObj = {
        id: userId,
        businessName,
        address,
        phoneNo,
        email,
        role
      };
    }

    return userObj;
  }
}

export default UserController;
