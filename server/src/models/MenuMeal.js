import Sequelize from 'sequelize';

export default (sequelize) => {
  const MenuMeal = sequelize.define('MenuMeal', {
    mealId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'Meals',
        key: 'mealId',
        as: 'mealId'
      }
    },
    menuId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'Menu',
        key: 'menuId',
        as: 'menuId'
      }
    },
  }, {});
  return MenuMeal;
};
