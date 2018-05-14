export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('caterer', 'user', 'admin'),
      allowNull: false
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    businessAddress: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    businessPhoneNo: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
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
  down: queryInterface => queryInterface.dropTable('Users')
};
