/**
 * @exports
 * @class ErrorHandler
 */
class ErrorHandler {
  /**
   * Handlers uncaught erros in the app
   * @method sendError
   * @memberof ErrorHandler
   * @param {object} err
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {(function|object)} Function next() or JSON object
   * Gotten from Express Documentation
   */
  static sendError(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    res.status(err.status || 500).json({ error: err.message });
  }
}

export default ErrorHandler;
