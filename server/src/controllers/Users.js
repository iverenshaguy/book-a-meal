import bcrypt from 'bcrypt';
import Authorization from '../middlewares/Authorization';
import UserModel from '../models/User';

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
    const newUser = await UserModel.create({
      firstname: req.body.firstname,
      businessName: req.body.businessName,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      businessPhoneNo: req.body.businessPhoneNo,
      businessAddress: req.body.businessAddress,
      role: req.body.role
    });

    const token = Authorization.generateToken(req);
    delete newUser.password;

    res.status(201).send({ user: newUser, token });
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
    return UserModel.findOne({ where: { email: req.body.email } }).then(async (authUser) => {
      if (!authUser) return res.status(401).send({ error: 'Invalid Credentials' });

      const valid = await Users.verifyPassword(req.body.password, authUser.password);

      if (!valid) return res.status(401).send({ error: 'Invalid Credentials' });

      const user = { ...authUser };
      const token = Authorization.generateToken(req);

      delete user.password;

      return res.status(200).send({ user: authUser, token });
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
}

export default Users;
