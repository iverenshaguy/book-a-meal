import usersDB from '../../data/users.json';
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
    const authUser = usersDB
      .find(user => user.email === req.body.email && user.password === req.body.password);

    if (!authUser) {
      return res.status(401).send({
        error: 'Invalid Credentials'
      });
    }

    const user = { ...authUser };
    const token = Authorization.generateToken(req);

    delete user.password;
    delete user.passwordHash;

    return res.status(200).send({ user, token });
  }
}

export default Users;
