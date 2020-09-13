import * as jwt from 'jsonwebtoken';
import { resolve } from 'path';
import { config as getEnv } from 'dotenv';
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
const expiredToken = `Bearer ${jwt.sign({ id: 1 }, process.env.SECRET, { expiresIn: 1 })}`;
const invalidToken = `Bearer ${jwt.sign({}, process.env.SECRET, { expiresIn: 86400 })}`;
const wrongSecretToken = `Bearer ${jwt.sign({ id: 1 }, 'fakesecret', { expiresIn: 86400 })}`;

const tokens = {
  fakeUserToken: `Bearer ${jwt.sign({
    id: '61bb8f8d-3b59-4294-acbc-166238kk18c391',
    email: 'ivy@shaguy.com',
    role: 'caterer',
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,

  iverenToken: `Bearer ${jwt.sign({
    id: '61bb8f8d-3b59-4294-acbc-16623818c391',
    email: 'iveren@shaguy.com',
    role: 'customer',
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,

  emiolaToken: `Bearer ${jwt.sign({
    id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
    email: 'emiola@olasanmi.com',
    role: 'customer',
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,

  foodCircleToken: `Bearer ${jwt.sign({
    id: '8356954a-9a42-4616-8079-887a73455a7f',
    email: 'food@circle.com',
    role: 'caterer',
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,

  bellyFillToken: `Bearer ${jwt.sign({
    id: 'ac1b253c-6b33-439b-ab6f-805a4fdd2e05',
    email: 'belly@fill.com',
    role: 'caterer',
  }, process.env.SECRET, { expiresIn: '48 hour' })}`,
};

// @ts-ignore
export const mockSequelize = new Sequelize({
  repositoryMode: true,
  operatorsAliases: 'false',
  database: 'book_a_meal_test',
  dialect: 'postgres',
  username: 'postgres',
  password: '',
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
  tokens,
  expiredToken,
  invalidToken,
  wrongSecretToken
};
