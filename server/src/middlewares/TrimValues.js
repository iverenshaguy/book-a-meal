/**
 * @exports
 * @class TrimValues
 */
class TrimValues {
  /**
   * Trims req.body values
   * @method validate
   * @memberof TrimValues
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static trim(req, res, next) {
    const keysArr = Object.keys(req.body);

    req.body = keysArr.reduce((obj, key) => {
      obj[key] = typeof req.body[key] === 'string' ?
        req.body[key].trim() :
        req.body[key];

      return obj;
    }, {});

    next();
  }
}

export default TrimValues;
