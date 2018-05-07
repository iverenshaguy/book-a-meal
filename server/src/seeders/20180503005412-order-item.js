export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('OrderItems', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    orderItemId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    orderId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'orderId',
        as: 'orderId'
      }
    },
    mealId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: true,
      references: {
        model: 'Meals',
        key: 'mealId',
        as: 'mealId'
      }
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 1,
      validate: {
        isInt: true,
        min: 1
      }
    },
    deliveryAddress: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    deliveryPhoneNo: {
      type: Sequelize.STRING,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('OrderItems')
};
