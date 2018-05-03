import Sequelize, { Model } from 'sequelize';
import db from './index';

const { sequelize } = db;

/**
 * @class Menu
 * @extends Model
 */
export default class Menu extends Model {
  /**
   * @method associate
   * @memberof Menu
   * @param {Object} models
   * @returns {nothins} returns nothing
   */
  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
}

Menu.init(
  {
    menuId: {
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
    meals: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: false,
      defaultValue: [],
      validate: {
        isUUID: 4,
        notEmpty: true
      }
    }
  },
  { sequelize }
);
