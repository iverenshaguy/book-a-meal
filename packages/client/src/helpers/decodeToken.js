import jwt from 'jsonwebtoken';

/**
 * Decodes localStorage Token
 * @function decodeToken
 * @returns {object} {decoded, token}
 */
const decodeToken = () => {
  const token = localStorage.getItem('jwtToken');

  const decoded = jwt.decode(token.replace('Bearer ', ''));

  return { decoded, token };
};

export default decodeToken;
