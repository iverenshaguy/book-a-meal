import { config as getEnv } from 'dotenv';

getEnv();

const environment = process.env.NODE_ENV || 'development';
const devMode = (environment !== 'production');

const databaseUrls = {
  development: process.env.DATABASE_URL,
  staging: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  production: process.env.DATABASE_URL
};

export const url = databaseUrls[environment];
export const config = {
  dialect: 'postgres',
  logging: devMode ? log => log : false
};

module.exports = {
  url: databaseUrls[environment],
  config: {
    dialect: 'postgres',
    logging: devMode ? log => log : false
  }
};
