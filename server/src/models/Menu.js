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
      userId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Users',
          key: 'userId',
          as: 'userId'
        }
      },
    }, { freezeTableName: true }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.User, {
      as: 'caterer',
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
