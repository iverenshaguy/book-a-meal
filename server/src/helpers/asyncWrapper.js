/* eslint-disable */
/**
 * Handles uncaught Errors for Async functions
 * @param {function} fn
 * @return {(func)} returns function
 * http://thecodebarbarian.com/80-20-guide-to-express-error-handling.html
 */
function asyncWrapper(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}

export default asyncWrapper;
