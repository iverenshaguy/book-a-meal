import Sequelize, { Model } from 'sequelize';
import db from './index';

const { sequelize } = db;

/**
 * @class OrderItem
 * @extends Model
 */
export default class OrderItem extends Model {
  /**
   * @method associate
   * @memberof OrderItem
   * @param {Object} models
   * @returns {nothins} returns nothing
   */
  static associate(models) {
    this.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE',
    });

    this.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  }
}

OrderItem.init(
  {
    orderItemId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 1,
      validate: {
        isInt: true,
        min: 1
      }
    },
    deliveryAddress: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    deliveryPhoneNo: {
      type: Sequelize.STRING,
      allowNull: true
    },
  },
  { sequelize }
);
