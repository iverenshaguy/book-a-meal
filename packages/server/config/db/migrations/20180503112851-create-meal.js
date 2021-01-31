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
      defaultValue: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg'
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
