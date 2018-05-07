import Sequelize from 'sequelize';

export default (sequelize) => {
  const Menu = sequelize.define(
    'Menu',
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
    }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Menu;
};
