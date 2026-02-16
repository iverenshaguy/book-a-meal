import instance from 'src/config/axios';

/**
 * Authenticates User
 * @function utils
 * @param {string} type - authentication type ie signin or signup
 * @param {object} user - user details to authenticate
 * @returns {func} axios instance
 */
export const authApi = (type) => (user) =>
  instance.request({
    url: `/auth/${type}`,
    method: 'POST',
    data: user,
    headers: {
      accept: 'application/json',
      'Content-type': 'application/json; charset=UTF-8',
    },
    validateStatus: (status) => status >= 200 && status < 300,
  });

export default authApi;
