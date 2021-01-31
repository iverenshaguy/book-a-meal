import * as jwt from 'jsonwebtoken';
import { resolve } from 'path';
import { config as getEnv } from 'dotenv';
import * as parseDbUrl from 'parse-database-url';
import { Sequelize } from 'sequelize-typescript';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

import { User } from '../../src/users/user.model';
import { Meal } from '../../src/meals/meal.model';
import { MenuMeal } from '../../src/menu/menuMeal.model';
import { Menu } from '../../src/menu/menu.model';
import { Order } from '../../src/orders/order.model';
import { OrderItem } from '../../src/orders/orderItem.model';
import { Notification } from '../../src/notifications/notification.model';

getEnv({ path: resolve(__dirname, '../../../../../.env') });

const rootURL = '/api/v2';
export const expiredToken = `Bearer ${jwt.sign({ id: 1 }, process.env.SECRET, { expiresIn: 1 })}`;
export const invalidToken = `Bearer ${jwt.sign({}, process.env.SECRET, { expiresIn: 86400 })}`;
export const wrongSecretToken = `Bearer ${jwt.sign({ id: 1 }, 'fakesecret', { expiresIn: 86400 })}`;
export const fakeUserToken = `Bearer ${jwt.sign({
  id: '61bb8f8d-3b59-4294-acbc-166238kk18c391',
  email: 'ivy@shaguy.com',
  role: 'caterer',
}, process.env.SECRET, { expiresIn: '48 hour' })}`;

export const generateUserToken = (id, email, role) => `Bearer ${jwt.sign({
  id,
  email,
  role,
}, process.env.SECRET, { expiresIn: '48 hour' })}`;

const parsedConfig = parseDbUrl(process.env.DATABASE_TEST_URL);

// @ts-ignore
export const mockSequelize = new Sequelize({
  repositoryMode: true,
  operatorsAliases: 'false',
  dialect: 'postgres',
  database: parsedConfig.database,
  username: parsedConfig.user,
  password: parsedConfig.password,
  host: parsedConfig.host,
  port: parsedConfig.port,
  logging: () => false,
  models: [User, Meal, Menu, MenuMeal, Order, OrderItem, Notification]
});

export const validationPipe = new ValidationPipe({
  transform: true,
  forbidNonWhitelisted: true,
  exceptionFactory: errors => new BadRequestException({
    errors: errors.reduce((acc, error) => {
      acc[error.property] = {
        location: 'body', // TODO change when Error object is well understood,
        param: error.property,
        value: error.value,
        msg: Object.entries(error.constraints)[0][1]
      };

      return acc;
    }, {})
  })
});

export default {
  rootURL,
  expiredToken,
  invalidToken,
  wrongSecretToken
};
