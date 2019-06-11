import errorResponse from './errorResponse';

/**
 * Handle HTTP errors
 * @function errorHandler
 * @param {object} err - error response
 * @returns {object} New Error Object
 * `error.request` is an instance of XMLHttpRequest in the browser and an instance of
 * http.ClientRequest in node.js
 */
const errorHandler = (err) => {
  let error = {};

  if (err.response) {
    error.status = err.response.status;
    error.response = errorResponse(err);
  } else if (err.request) {
    error = err.request;
  } else {
    error = err.message;
  }

  return error;
};

export default errorHandler;
