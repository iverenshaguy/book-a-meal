import uuidv4 from 'uuid/v4';
import moment from 'moment';
import usersDB from '../../data/users.json';

const token = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const defaultUserObject = {
  username: null,
  businessName: null,
  email: null,
  password: null, // for testing reference, won't be in real database
  passwordHash: null,
  businessPhoneNo: null,
  businessAddress: null,
  created: null,
  updated: null,
  role: null
};

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
    // encrypt password
    // const hash = await PasswordHash.hashPassword(req.body.password);
    const newUser = { ...defaultUserObject, ...req.body };
    // newUser.passwordHash = hash;
    newUser.email = req.body.email.toLowerCase();
    newUser.role = req.body.role;
    newUser.userId = uuidv4();
    delete newUser.password;
    delete newUser.passwordConfirm;
    newUser.createdAt = moment().format();
    newUser.updatedAt = moment().format();

    usersDB.push(newUser);

    delete newUser.passwordHash;

    res.status(201).json({
      user: newUser,
      token
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
  static login(req, res) {
    const authUser = usersDB
      .find(user => user.email === req.body.email && user.password === req.body.password);

    if (!authUser) {
      return res.status(401).json({
        error: 'Invalid Credentials'
      });
    }

    const user = { ...authUser };

    delete user.password;
    delete user.passwordHash;

    return res.status(200).json({ user, token });
  }
}

export default Users;
