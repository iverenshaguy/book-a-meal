import errors from '../helpers/errors.json';

const userToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

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
    this.authorize = this.authorize.bind(this);
  }

  /**
   * Authorize User
   * @method authorize
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  authorize(req, res, next) {
    // token could provided via body, as a query string or in the header
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    // check to be sure there's a token
    if (!bearerToken || !token) {
      return res.status(401).send({
        error: errors['401']
      });
    }

    if (this.type === 'caterer') {
      return Authorization.authorizeCaterer(req, res, next, token);
    }

    return Authorization.authorizeUser(req, res, next, token);
  }

  /**
   * Check if Caterer is Authenticated
   * @method authorizeCaterer
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @param {string} token
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorizeCaterer(req, res, next, token) {
    // return 403 forbidden error if user is not admin/caterer
    // role will be added in real JWT token implementation
    // if role in decoded token is not admin, action will not be allowed
    if (token !== adminToken) {
      return res.status(403).send({
        error: errors['403']
      });
    }

    return next();
  }

  /**
   * Check if User is Authenticated
   * @method authorizeUser
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @param {string} token
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorizeUser(req, res, next, token) {
    if (token !== userToken) {
      return res.status(401).send({
        error: errors['401']
      });
    }

    return next();
  }
}

export default Authorization;
