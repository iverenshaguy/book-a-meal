import jwt from 'jsonwebtoken';

const rootURL = '/api/v1';
const expiredToken = `Bearer ${jwt.sign({ id: 1 }, process.env.SECRET, { expiresIn: 1 })}`;
const invalidToken = `Bearer ${jwt.sign({}, process.env.SECRET, { expiresIn: 86400 })}`;
const wrongSecretToken = `Bearer ${jwt.sign({ id: 1 }, 'fakesecret', { expiresIn: 86400 })}`;

const tokens = {
  fakeUserToken: `Bearer ${jwt.sign({
    id: '61bb8f8d-3b59-4294-acbc-166238kk18c391',
    email: 'ivy@shaguy.com',
    role: 'caterer',
  }, process.env.SECRET, { expiresIn: '1 hour' })}`,

  iverenToken: `Bearer ${jwt.sign({
    id: '61bb8f8d-3b59-4294-acbc-16623818c391',
    email: 'iveren@shaguy.com',
    role: 'customer',
  }, process.env.SECRET, { expiresIn: '1 hour' })}`,

  emiolaToken: `Bearer ${jwt.sign({
    id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
    email: 'emiola@olasanmi.com',
    role: 'customer',
  }, process.env.SECRET, { expiresIn: '1 hour' })}`,

  foodCircleToken: `Bearer ${jwt.sign({
    id: '8356954a-9a42-4616-8079-887a73455a7f',
    email: 'food@circle.com',
    role: 'caterer',
  }, process.env.SECRET, { expiresIn: '1 hour' })}`,

  bellyFillToken: `Bearer ${jwt.sign({
    id: 'ac1b253c-6b33-439b-ab6f-805a4fdd2e05',
    email: 'belly@fill.com',
    role: 'caterer',
  }, process.env.SECRET, { expiresIn: '1 hour' })}`,
};

export default {
  rootURL,
  tokens,
  expiredToken,
  invalidToken,
  wrongSecretToken
};
