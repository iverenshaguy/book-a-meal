import Sequelize from 'sequelize';

export default (sequelize) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
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
    }
  );

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE',
    });

    OrderItem.belongsTo(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  };

  return OrderItem;
};
