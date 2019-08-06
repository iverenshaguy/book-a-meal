import axios from 'axios';

/**
 * Authenticates User
 * @function authAPI
 * @param {string} type - authentication type ie signin or signup
 * @param {object} user - user details to authenticate
 * @returns {func} axios instance
 */
const authAPI = type => user => axios(`/api/v1/auth/${type}`, {
  method: 'POST',
  data: user,
  headers: {
    accept: 'application/json',
    'Content-type': 'application/json; charset=UTF-8'
  },
  validateStatus: status => status >= 200 && status < 300
});

export default authAPI;
