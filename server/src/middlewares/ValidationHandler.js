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
   * @param {method} controllerMethod
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static validate(req, res, controllerMethod) {
    const errors = validationResult(req);
    const data = matchedData(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    return controllerMethod(req, res, data);
  }
}

export default ValidationHandler;
