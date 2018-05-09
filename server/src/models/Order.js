import Sequelize from 'sequelize';

export default (sequelize) => {
  const Order = sequelize.define(
    'Order',
    {
      orderId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      deliveryAddress: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      deliveryPhoneNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'userId',
          as: 'userId'
        }
      },
    },
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Order.belongsToMany(models.Meal, {
      as: 'meals',
      through: models.OrderItem,
      foreignKey: 'orderId'
    });
  };

  return Order;
};
