import moment from 'moment';
import { config } from 'dotenv';
import errors from '../../data/errors.json';

config();

/**
 * @exports
 * @class OrderValidationHandler
 */
class OrderValidationHandler {
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

    if (!moment().isBetween(opening, closing)) {
      return res.status(422).json({ error: errors.shopClosed });
    }

    next();
  }
}

export default OrderValidationHandler;
