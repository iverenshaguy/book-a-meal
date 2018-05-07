import Sequelize, { Model } from 'sequelize';
import db from './index';

const { sequelize } = db;

/**
 * @class Order
 * @extends Model
 */
export default class Order extends Model {
  /**
   * @method associate
   * @memberof Order
   * @param {Object} models
   * @returns {nothins} returns nothing
   */
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  }
}

Order.init(
  {
    orderId: {
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
