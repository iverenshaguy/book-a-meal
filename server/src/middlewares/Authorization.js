import jwt from 'jsonwebtoken';
import errors from '../../lib/errors.json';
import models from '../models';
import UserController from '../controllers/UserController';

/**
 * @exports
 * @class Authorization
 */
class Authorization {
  /**
   * @constructor
   * @param {string} type
   */
  constructor(type) {
    this.type = type;
  }

  /**
   * @method getToken
   * @memberof Authorization
   * @param {object} req
   * @returns {string} token
   */
  static getToken(req) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    return token;
  }

  /**
   * @method generateToken
   * @memberof Authorization
   * @param {object} user
   * @returns {string} token
   * expires in 48 hours
   */
  static generateToken(user) {
    const token = jwt.sign(
      {
        id: user.userId,
        role: user.role,
        email: user.email.toLowerCase(),
      },
      process.env.SECRET,
      {
        expiresIn: 172800
      }
    );

    return token;
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
    const authUser = await models.User.findOne({ where: { email: req.email } });
    const user = UserController.getUserObj({ ...authUser.dataValues });
    const token = Authorization.generateToken(user);

    return res.status(200).json({ user, token });
  }

  /**
   * Authorize user
   * @method authorize
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorize(req, res, next) {
    const token = Authorization.getToken(req);

    if (!token) return res.status(401).json({ error: errors['401'] });

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ error: 'User authorization token is expired' });
        }

        return res.status(401).json({ error: 'Failed to authenticate token' });
      }

      const foundUser = await models.User.findOne({ where: { email: decoded.email } });

      if (!foundUser) return res.status(401).json({ error: errors['401'] });

      req.userId = foundUser.userId;
      req.email = foundUser.email;
      req.role = foundUser.role;

      return next();
    });
  }

  /**
   * Authorize Specific Role
   * @method authorizeRole
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   * return 403 forbidden error if user doesn't have required role
   */
  authorizeRole = (req, res, next) => {
    const { type } = this;

    if (type !== req.role) {
      return res.status(403).json({
        error: errors['403']
      });
    }

    next();
  }
}

export default Authorization;
