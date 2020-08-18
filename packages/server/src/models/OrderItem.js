import Sequelize from 'sequelize';

export default (sequelize) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 1,
        validate: {
          isInt: true,
          min: 1
        }
      },
      delivered: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      orderId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        allowNull: true,
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
    }
  );

  return OrderItem;
};
