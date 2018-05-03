import Sequelize, { Model } from 'sequelize';
import db from './index';

const { sequelize } = db;

/**
 * @class Meal
 * @extends Model
 */
export default class Meal extends Model {
  /**
   * @method associate
   * @memberof Meal
   * @param {Object} models
   * @returns {nothins} returns nothing
   */
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    this.hasMany(models.OrderItem, {
      foreignKey: 'mealId',
      as: 'orderItems'
    });

    this.hasMany(models.Menu, {
      foreignKey: 'mealId',
      as: 'menu'
    });
  }
}

Meal.init(
  {
    mealId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'This is a required field'
      },
      unique: true,
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
          msg: 'Input is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    },
    imageURL: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    forVegetarians: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        isIn: {
          args: [
            [false, true]
          ],
          msg: 'Please select a field'
        }
      }
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 100
      }
    },
  },
  { sequelize }
);
