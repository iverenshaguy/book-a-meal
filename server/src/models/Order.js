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
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true
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
    },
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  return Order;
};
