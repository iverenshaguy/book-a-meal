import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import db from './index';

const SALT_ROUNDS = 10;
const { sequelize } = db;

/**
 * @class User
 * @extends Model
 */
class User extends Model {
  /**
   * @method hashPassword
   * @memberof User
   * @param {object} user
   * @param {object} options
   * @returns {snothing} returns nothing
   */
  static async hashPassword(user) {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    return user.setDataValue('password', hash);
  }
}

User.init(
  {
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('caterer', 'user'),
      allowNull: false
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    businessAddress: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    businessPhoneNo: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    hooks: {
      beforeCreate: User.hashPassword
    }
  }
);

export default User;
