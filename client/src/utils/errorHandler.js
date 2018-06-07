import errorResponse from './errorResponse';

/**
 * Handle HTTP errors
 * @function errorHandler
 * @param {object} err - error response
 * @returns {object} New Error Object
 */
const errorHandler = (err) => {
  let error = {};

  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    error.status = err.response.status;
    error.response = errorResponse(err);
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    error = err.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    error = err.message;
  }

  return error;
};

export default errorHandler;
