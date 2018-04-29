import 'babel-polyfill';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import PasswordHash from '../../src/helpers/PasswordHash';

chai.use(chaiAsPromised);
chai.should();

describe('Test for Password Hash', () => {
  const password = 'pѬѬasѪ"§§)("!编/)$=?!°&%)?§"$(§sw汉字编码§"$(§sw汉字方法orФdpѬѬasѪ"§§)("!/)$=?!°&%)?编码方法orФd';
  const badPassword = ['kdfkdf'];

  describe('## Hash the Password', () => {
    it('should hash the password and return a string', async () => {
      const result = await PasswordHash.hashPassword(password);
      expect(result).to.be.a('string');
      expect(result).to.include('000000100007a120');
    });

    it('should hash the password and return a string containing 000000100007a120', async () => {
      const result = await PasswordHash.hashPassword(password);
      expect(result).to.be.a('string');
      expect(result).to.include('000000100007a120');
    });

    it('should not hash the password and return a TypeError(Password Must Be a String)', async () =>
      PasswordHash.hashPassword(badPassword).should.be.rejectedWith(TypeError, 'Password Must Be a String'));
  });

  describe('## Verify the Password Hash', () => {
    const user = {
      passwordHash: '000000100007a1207c355d0d150c23cb08c80b010ab8937d87ffc23a21a25154b54ee5c5959219ffcfa1ac5ded62c2e60025ee6105b5369ee'
    };
    const userPassword = user.passwordHash.toString();

    it('should verify the password hash and return a boolean(true)', async () => {
      const result = await PasswordHash.verifyPassword(password, userPassword);
      expect(result).to.be.a('boolean');
      expect(result).to.equal(true);
    });

    it('should verify the password hash and return a boolean(false)', async () => {
      const wrongPassword = '$%%^&**^%#@#$(&^WSDJKDSJTYFAS{}}SDNDYSD';
      const result = await PasswordHash.verifyPassword(wrongPassword, userPassword);
      expect(result).to.be.a('boolean');
      expect(result).to.equal(false);
    });

    it('should not verify the password and return an Error(Database Password must be Provided for Comparism)', () =>
      PasswordHash.verifyPassword(password).should.be.rejectedWith(Error, 'Database Password must be Provided for Comparism'));

    it('should not verify the password and return a TypeError(Password Must Be a String)', () =>
      PasswordHash.verifyPassword(badPassword, userPassword).should.be.rejectedWith(TypeError, 'Password Must Be a String'));
  });
});
