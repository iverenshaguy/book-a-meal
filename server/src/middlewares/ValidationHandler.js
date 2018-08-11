import moment from 'moment';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import messages from '../../lib/errors.json';

/**
 * @exports
 * @class ValidationHandler
 */
class ValidationHandler {
  /**
   * Function to check for empty request
   * @method isEmptyReq
   * @memberof ValidationHandler
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static isEmptyReq(req, res, next) {
    if (!Object.values(req.body).length) {
      return res.status(400).json({ error: messages.empty });
    }

    next();
  }

  /**
   * Handlers validation for order creation
   * @method create
   * @memberof OrderValidationHandler
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   */
  static isShopOpen(req, res, next) {
    const opening = moment({ hour: process.env.OPENING_HOUR, minute: process.env.OPENING_MINUTE });
    const closing = moment({ hour: process.env.CLOSING_HOUR, minute: process.env.CLOSING_MINUTE });
    const midnight = moment('12:00 AM', 'h:mma');
    const oneAM = moment('1:00 AM', 'h:mma');

    if (
      moment().isBefore(opening) ||
      moment().isAfter(closing) ||
      moment().isBetween(midnight, oneAM)
    ) {
      return res.status(200).json({ message: messages.shopClosed });
    }

    next();
  }

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

      return res.status(400).json({ errors: mappedErrors });
    }

    return next();
  }
}

export default ValidationHandler;
