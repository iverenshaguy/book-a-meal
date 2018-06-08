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
        defaultValue: 'https://firebasestorage.googleapis.com/v0/b/book-a-meal.appspot.com/o/images%2Fplaceholder-image.jpg?alt=media&token=e688dcde-0496-4a10-a456-0825e5202c62'
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
    }, { paranoid: true }
  );

  Meal.associate = (models) => {
    Meal.belongsTo(models.User, {
      as: 'caterer',
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
