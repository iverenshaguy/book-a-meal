import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { User } from '../users/user.model';
import { Meal } from '../meals/meal.model';
import { OrderItem } from './orderItem.model';
import { Notification } from '../notifications/notification.model';

enum ORDER_STATUS {
  started = 'started',
  pending = 'pending',
  delivered = 'delivered',
  canceled = 'canceled'
}

@Table
export class Order extends Model<Order | any> {

  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column
  orderId: string;

  @Column(DataType.TEXT)
  deliveryAddress: string;

  @Column
  deliveryPhoneNo: string;

  @Default('started')
  @Column(DataType.ENUM('started', 'pending', 'delivered', 'canceled'))
  status: ORDER_STATUS;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column(DataType.UUIDV4)
  userId: string;

  @BelongsTo(() => User, 'userId')
  customer: User;

  @BelongsToMany(() => Meal, () => OrderItem, 'orderId')
  meals: Meal[];

  @HasMany(() => Notification, 'orderId')
  notifications: Notification[];
};
