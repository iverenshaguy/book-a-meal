import errors from '../../data/errors.json';

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
    this.authorizeRole = this.authorizeRole.bind(this);
  }

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
    const isInvalidToken = token !== userToken && token !== adminToken; // replace with jwt
    let role;

    // we'll use the role from user token to know what type of user
    // we need to get data for. If there's no role, it means token is invalid
    // invalid/expired token or no token
    if (!token || isInvalidToken) {
      return res.status(401).send({
        error: errors['401']
      });
    }

    if (token === adminToken) role = 'caterer';
    if (token === userToken) role = 'user';

    // if token is valid, jwt decode and change request body to reflect role and userId
    req.body.role = role;
    req.body.userId = role === 'caterer' ?
      '8356954a-9a42-4616-8079-887a73455a7f' :
      'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac';

    next();
  }

  /**
   * Authorize Specific Role
   * @method authorizeRole
   * @memberof Authorization
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  authorizeRole(req, res, next) {
    const token = Authorization.getToken(req);
    const { type } = this;
    // will be used to know what role to check for
    const tokenType = type === 'caterer' ? adminToken : userToken;

    // return 403 forbidden error if user doesn't have required role
    // role will be added in real JWT token implementation
    if (token !== tokenType) {
      return res.status(403).send({
        error: errors['403']
      });
    }

    next();
  }
}

export default Authorization;
