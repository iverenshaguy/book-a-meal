import errors from '../helpers/errors.json';

const adminToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

/**
 * @exports
 * @class Authorization
 */
class Authorization {
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
    // token could provided via body, as a query string or in the header
    const bearerToken = req.headers.authorization;
    const token = bearerToken && bearerToken.replace('Bearer ', '');

    // check to be sure there's a token
    if (!bearerToken || !token) {
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
}

export default Authorization;
