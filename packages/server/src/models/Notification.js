import Sequelize from 'sequelize';

export default (sequelize) => {
  const Notification = sequelize.define(
    'Notification',
    {
      notifId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
    },
  );

  Notification.associate = (models) => {
    Notification.hasOne(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });

    Notification.hasOne(models.Menu, {
      foreignKey: 'menuId',
      onDelete: 'CASCADE',
    });

    Notification.hasOne(models.Order, {
      foreignKey: 'orderId',
      onDelete: 'CASCADE',
    });
  };

  return Notification;
};
