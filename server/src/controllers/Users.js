import PasswordHash from '../helpers/PasswordHash';
import usersDB from '../dummyData/users';

const token = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';


/**
 * @exports
 * @class Users
 */
class Users {
  /**
   * Registers a new user
   * @method register
   * @memberof Home
   * @param {object} req
   * @param {object} res
   * @param {object} data
   * @returns {(function|object)} Function next() or JSON object
   */
  static async register(req, res, data) {
    // encrypt password
    const hash = await PasswordHash.hashPassword(req.body.password);
    const newUser = Object.assign(data);
    newUser.passwordHash = hash;
    newUser.email = req.body.email.toLowerCase();
    delete newUser.password;
    delete newUser.passwordConfirm;

    usersDB.push(newUser);

    delete newUser.passwordHash;

    res.status(201).send({
      user: newUser,
      token
    });
  }
}

export default Users;
