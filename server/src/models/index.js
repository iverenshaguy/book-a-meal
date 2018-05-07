import Sequelize from 'sequelize';
import configAll from '../../config/database_config';

const env = process.env.NODE_ENV || 'development';
const config = configAll[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
