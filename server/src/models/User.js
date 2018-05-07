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
   * @method associate
   * @memberof User
   * @param {Object} models
   * @returns {nothins} returns nothing
   */
  static associate(models) {
    this.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meals'
    });

    this.hasMany(models.Menu, {
      foreignKey: 'userId',
      as: 'menu'
    });

    this.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders'
    });

    this.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications'
    });
  }

  /**
   * @method hashPassword
   * @memberof User
   * @param {object} user
   * @param {object} options
   * @returns {snothing} returns nothing
   */
  static async hashPasswordBeforeSave(user, options) {
    try {
      const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
      return user.setDataValue('password', hash);
    } catch (error) {
      return options.sequelize.Promise.reject(error);
    }
  }

  /**
   * @method isPasswordValid
   * @memberof User
   * @param {string} password
   * @return {Promise} Promise of true or false
   */
  async isPasswordValid(password) {
    return bcrypt.compare(password, this.password);
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
      beforeCreate: User.hashPasswordBeforeSave,
      beforeUpdate: User.hashPasswordBeforeSave,
    }
  }
);

export default User;
