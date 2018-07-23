import bcrypt from 'bcrypt';
import randomString from 'random-string';
import { Op } from 'sequelize';
import Authorization from '../middlewares/Authorization';
import db from '../models';
import Mailer from '../utils/Mailer';

/**
 * @exports
 * @class Users
 */
class Users {
  /**
   * Registers a new user
   * @method register
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async register(req, res) {
    if (req.body.role === 'caterer') {
      const businessNameExists = await db.User.findOne({
        where: { businessName: { [Op.iLike]: req.body.businessName } }
      });

      if (businessNameExists) return res.status(409).send({ error: 'Business name already in use' });
    }

    db.User.findOrCreate({
      where: { email: { [Op.iLike]: req.body.email } },
      defaults: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        businessName: req.body.businessName,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        businessPhoneNo: req.body.businessPhoneNo,
        businessAddress: req.body.businessAddress,
        role: req.body.role
      }
    }).spread((newUser, created) => {
      if (!created) return res.status(409).send({ error: 'Email already in use' });

      const user = Users.getUserObj({ ...newUser.dataValues });
      const token = Authorization.generateToken(user);

      return res.status(201).json({ user, token });
    });
  }

  /**
   * Logs in a user
   * @method login
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async login(req, res) {
    return db.User.findOne({ where: { email: req.body.email } }).then(async (authUser) => {
      if (!authUser) return res.status(401).json({ error: 'Invalid Credentials' });

      const valid = await Users.verifyPassword(req.body.password, authUser.password);

      if (!valid) return res.status(401).json({ error: 'Invalid Credentials' });

      const user = Users.getUserObj({ ...authUser.dataValues });
      const token = Authorization.generateToken(user);

      return res.status(200).json({ user, token });
    });
  }

  /**
   * @method verifyPassword
   * @memberof Users
   * @param {string} password
   * @param {string} hash
   * @return {Promise} Promise of true or false
   */
  static async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Sends password token to user
   * @method forgotPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async forgotPassword(req, res) {
    const user = await db.User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(404).json({ error: 'User doesn\'t exist on the platform' });

    const token = randomString({ length: 40 });
    await user.update({
      passwordResetToken: token,
      passwordTokenExpiry: Date.now() + 3600000 // 1 hour from now
    });

    await Mailer.forgotPasswordMail(token, req.body.email);

    return res.status(200).json({ message: 'A reset token has been sent to your email address' });
  }

  /**
   * Sends password token to user
   * @method resetPassword
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async resetPassword(req, res) {
    const user = await db.User.findOne({
      where: {
        passwordResetToken: req.query.token,
        passwordTokenExpiry: {
          [Op.gt]: Date.now()
        }
      }
    });

    if (!user) return res.status(400).send({ error: 'Password reset token is invalid or has expired' });

    await user.update({
      passwordResetToken: null,
      passwordTokenExpiry: null,
      password: req.body.password
    });

    await Mailer.resetPasswordMail(req.body.email);

    return res.status(200).json({ message: 'Password reset successful' });
  }

  /**
   * Resets User Token
   * @method resetToken
   * @memberof Users
   * @param {object} req
   * @param {object} res
   * @returns {(function|object)} Function next() or JSON object
   */
  static async refreshToken(req, res) {
    return db.User.findOne({ where: { email: req.email } }).then((authUser) => {
      const user = Users.getUserObj({ ...authUser.dataValues });
      const token = Authorization.generateToken(user);

      return res.status(200).json({ user, token });
    });
  }

  /**
   * @method getUserObj
   * @memberof Users
   * @param {object} user
   * @return {object} User Object
   */
  static getUserObj(user) {
    let userObj;

    if (user.role === 'customer' || user.role === 'admin') {
      userObj = {
        id: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role
      };
    }

    if (user.role === 'caterer') {
      userObj = {
        id: user.userId,
        businessName: user.businessName,
        businessAddress: user.businessAddress,
        businessPhoneNo: user.businessPhoneNo,
        email: user.email,
        role: user.role
      };
    }

    return userObj;
  }
}

export default Users;
