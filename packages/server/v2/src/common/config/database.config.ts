import { config as getEnv } from 'dotenv';
import { resolve } from 'path';
import * as parseDbUrl from 'parse-database-url';
import { registerAs } from '@nestjs/config';

getEnv({ path: resolve(__dirname, '../../../../../../.env') });

const environment = process.env.NODE_ENV || 'development';
const devMode = (environment !== 'production');

const databaseUrls = {
  development: process.env.DATABASE_URL,
  staging: process.env.DATABASE_URL,
  test: process.env.DATABASE_TEST_URL,
  e2e: process.env.DATABASE_TEST_URL,
  production: process.env.DATABASE_URL
};

const url = databaseUrls[environment];
const parsedConfig = parseDbUrl(url);

export default registerAs('DATABASE', () => ({
  url: databaseUrls[environment],
  database: parsedConfig.database,
  username: parsedConfig.user,
  password: parsedConfig.password,
  host: parsedConfig.host,
  port: parsedConfig.port,
  dialect: 'postgres',
  logging: devMode ? log => log : false
}));
