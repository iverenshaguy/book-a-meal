export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Meals', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    mealId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
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
    },
    title: {
      type: Sequelize.STRING,
      allowNull: {
        args: false,
        msg: 'This is a required field'
      }
    },
    imageUrl: {
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Meals')
};
