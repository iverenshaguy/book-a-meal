import errorHandler from '../../src/helpers/errorHandler';

describe('Utils: errorHandler', () => {
  describe('response error', () => {
    it('should create new error object on 400 error response', () => {
      const response = { response: { status: 400, data: { errors: 'This is an error' } } };
      const error = errorHandler(response);
      const errorResponse = { status: 400, response: 'This is an error' };

      expect(error).toEqual(errorResponse);
    });

    it('should create new error object on 401 error response', () => {
      const response = { response: { status: 401, data: { error: 'This is an error' } } };
      const error = errorHandler(response);
      const errorResponse = { status: 401, response: 'This is an error' };

      expect(error).toEqual(errorResponse);
    });

    it('should create new error object on 403 error response', () => {
      const response = { response: { status: 403, data: { error: 'This is an error' } } };
      const error = errorHandler(response);
      const errorResponse = { status: 403, response: 'This is an error' };

      expect(error).toEqual(errorResponse);
    });

    it('should create new error object on 500 error response', () => {
      const response = { response: { status: 500, data: { error: 'This is an error' } } };
      const error = errorHandler(response);
      const errorResponse = { status: 500, response: 'Something happened, please check your connection and try again' };

      expect(error).toEqual(errorResponse);
    });

    it('should create new error object on 409 error response', () => {
      const response = { response: { status: 409, data: { error: 'This is an error' } } };
      const error = errorHandler(response);
      const errorResponse = { status: 409, response: 'This is an error' };

      expect(error).toEqual(errorResponse);
    });

    it('should create new error object on 404 error response', () => {
      const response = { response: { status: 404, data: { error: 'This is an error' } } };
      const error = errorHandler(response);
      const errorResponse = { status: 404, response: 'This is an error' };

      expect(error).toEqual(errorResponse);
    });

    it('should create new error object on other error response', () => {
      const response = { response: { status: 422, statusText: 'This is a weird error' } };
      const error = errorHandler(response);
      const errorResponse = { status: 422, response: 'This is a weird error' };

      expect(error).toEqual(errorResponse);
    });
  });

  it('should create new error object on request error', () => {
    const request = { request: { error: 'This is an error' } };
    const error = errorHandler(request);
    const errorResponse = { error: 'This is an error' };

    expect(error).toEqual(errorResponse);
  });

  it('should create new error object on other errors', () => {
    const message = { message: { error: 'This is an error' } };
    const error = errorHandler(message);
    const errorResponse = { error: 'This is an error' };

    expect(error).toEqual(errorResponse);
  });
});
