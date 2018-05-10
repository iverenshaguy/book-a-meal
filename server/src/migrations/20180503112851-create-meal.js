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
      },
      validate: {
        is: {
          args: /^[a-z 0-9 ,.'-()\s]+$/i,
          msg: 'Input is not valid'
        },
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    },
    imageURL: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        isUrl: true,
        notEmpty: {
          args: true,
          msg: 'Input cannot be empty'
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    forVegetarians: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      validate: {
        isIn: {
          args: [
            [false, true]
          ],
          msg: 'Please select a field'
        }
      }
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 100
      }
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
  down: queryInterface => queryInterface.dropTable('Meals')
};
