import Sequelize from 'sequelize';

export default (sequelize) => {
  const Meal = sequelize.define(
    'Meal',
    {
      mealId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imageURL: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      vegetarian: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
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
      }
    }
  );

  Meal.associate = (models) => {
    Meal.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Meal.belongsToMany(models.Menu, {
      through: models.MenuMeal,
      foreignKey: 'mealId',
    });

    Meal.belongsToMany(models.Order, {
      through: models.OrderItem,
      foreignKey: 'mealId',
    });
  };

  return Meal;
};
