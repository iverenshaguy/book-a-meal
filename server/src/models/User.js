import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('caterer', 'user'),
        allowNull: false
      },
      businessName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      businessAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      businessPhoneNo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      hooks: {
        beforeCreate: user => User.hashPassword(user)
      }
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Meal, {
      foreignKey: 'userId',
      as: 'meals'
    });

    User.hasMany(models.Menu, {
      foreignKey: 'userId',
      as: 'menu'
    });

    User.hasMany(models.Order, {
      foreignKey: 'userId',
      as: 'orders'
    });

    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications'
    });
  };

  User.hashPassword = async (user) => {
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    return user.setDataValue('password', hash);
  };

  return User;
};

