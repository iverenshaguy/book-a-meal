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
      }
    }
  );

  return OrderItem;
};
