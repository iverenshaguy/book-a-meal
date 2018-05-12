import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';

/**
 * @exports
 * @class ValidationHandler
 */
class ValidationHandler {
  /**
   * Sends validation errors if existent, passes it on to the next middleware if not
   * @method validate
   * @memberof ValidationHandler
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static validate(req, res, next) {
    const errors = validationResult(req);
    req = { ...req, ...matchedData(req) };

    if (!errors.isEmpty()) {
      const mappedErrors = errors.mapped();
      // delete mappedErrors[/a-zA-Z/g].value;
      return res.status(422).json({ errors: mappedErrors });
    }

    return next();
  }
}

export default ValidationHandler;
