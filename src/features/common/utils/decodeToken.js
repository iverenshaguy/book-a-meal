import jwtDecode from 'jwt-decode';

/**
 * Decodes localStorage Token
 * @function decodeToken
 * @returns {object} {decoded, token}
 */
const decodeToken = () => {
  const token = localStorage.getItem('jwtToken');

  const decoded = jwtDecode(token.replace('Bearer ', ''));

  return { decoded, token };
};

export default decodeToken;
