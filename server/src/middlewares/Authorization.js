import errors from '../../data/errors.json';

const userToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

/**
 * @exports
 * @class Authorization
 */
class Authorization {
  /**
   * @method getToken
   * @memberof Authorization
   * @param {object} req
   * @returns {string} token
   */
  static getToken(req) {
    // token could provided via body, as a query string or in the header
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    return token;
  }

  /**
   * Check if Anybody is Authenticated
   * @method authorizeAny
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @param {function} method
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorizeAny(req, res, next, method) {
    const token = Authorization.getToken(req);
    const role = token === adminToken ? 'caterer' : 'user';

    if (!token) {
      return res.status(401).send({
        error: errors['401']
      });
    }

    // we'll use the role from user token to know what type of user
    // we need to get data for
    if (token !== adminToken && token !== userToken) {
      return res.status(403).send({
        error: errors['403']
      });
    }

    return method(req, res, role);
  }


  /**
   * Check if Caterer is Authenticated
   * @method authorizeCaterer
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorizeCaterer(req, res, next) {
    const token = Authorization.getToken(req);

    if (!token) {
      return res.status(401).send({
        error: errors['401']
      });
    }

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
   * @returns {(function|object)} Function next() or JSON object
   */
  static authorizeUser(req, res, next) {
    const token = Authorization.getToken(req);

    if (token !== userToken) {
      return res.status(401).send({
        error: errors['401']
      });
    }

    return next();
  }
}

export default Authorization;
