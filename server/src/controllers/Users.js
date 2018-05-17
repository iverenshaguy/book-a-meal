import bcrypt from 'bcrypt';
import Authorization from '../middlewares/Authorization';
import db from '../models';

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
    const newUser = await db.User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      businessName: req.body.businessName,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      businessPhoneNo: req.body.businessPhoneNo,
      businessAddress: req.body.businessAddress,
      role: req.body.role
    });

    const user = Users.getUserObj({ ...newUser.dataValues });
    const token = Authorization.generateToken(user);

    res.status(201).json({ user, token });
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
   * @method getUserObj
   * @memberof Users
   * @param {object} user
   * @return {object} User Object
   */
  static getUserObj(user) {
    let userObj;

    if (user.role === 'user' || user.role === 'admin') {
      userObj = {
        userId: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      };
    }

    if (user.role === 'caterer') {
      userObj = {
        userId: user.userId,
        businessName: user.businessName,
        businessAddress: user.businessAddress,
        businessPhoneNo: user.businessPhoneNo,
        email: user.email,
      };
    }

    return userObj;
  }
}

export default Users;
