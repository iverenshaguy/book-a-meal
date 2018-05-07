import Sequelize, { Model } from 'sequelize';
import db from './index';

const { sequelize } = db;

/**
 * @class Notification
 * @extends Model
 */
export default class Notification extends Model {
  /**
   * @method associate
   * @memberof Notification
   * @param {Object} models
   * @returns {nothins} returns nothing
   */
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    this.belongsTo(models.Menu, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE',
    });

    this.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  }
}

Notification.init(
  {
    notifId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: false
    },
  },
  { sequelize }
);
