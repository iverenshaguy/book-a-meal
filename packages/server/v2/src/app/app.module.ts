import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '../users/users.module';
import { MealsModule } from '../meals/meals.module';
import { MenuModule } from '../menu/menu.module';
import { OrdersModule } from '../orders/orders.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AuthModule } from '../auth/auth.module';

import databaseConfig from '../common/config/database.config';
import { User } from '../users/user.model';
import { Meal } from '../meals/meal.model';
import { MenuMeal } from '../menu/menuMeal.model';
import { Menu } from '../menu/menu.model';
import { Order } from '../orders/order.model';
import { OrderItem } from '../orders/orderItem.model';
import { Notification } from '../notifications/notification.model';

import { AppController } from './app.controller';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('DATABASE'),
        models: [User,Meal,Menu, MenuMeal, Order, OrderItem, Notification]
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname + '../../../../../../.env'),
      isGlobal: true,
      load: [databaseConfig]
    }),
    UsersModule,
    MealsModule,
    MenuModule,
    OrdersModule,
    NotificationsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
