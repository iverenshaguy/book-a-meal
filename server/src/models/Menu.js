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
      }
    }, { freezeTableName: true }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Menu.belongsToMany(models.Meal, {
      as: 'meals',
      through: models.MenuMeal,
      foreignKey: 'menuId',
    });
  };

  return Menu;
};
