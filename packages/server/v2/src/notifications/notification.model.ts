import { AllowNull, Column, DataType, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table, HasOne } from 'sequelize-typescript';

import { User } from '../users/user.model';
import { Menu } from '../menu/menu.model';
import { Order } from '../orders/order.model';

@Table
export class Notification extends Model<Notification | any> {

  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column
  notifId: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  message: string;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUIDV4,
    onDelete: 'CASCADE'
  })
  userId: string;

  @HasOne(() => User, 'userId')
  notifications: Notification[];

  @IsUUID(4)
  @ForeignKey(() => Menu)
  @Column({
    type: DataType.UUIDV4,
    onDelete: 'CASCADE'
  })
  menuId: string;

  @HasOne(() => Menu, 'menuId')
  menu: Menu

  @IsUUID(4)
  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUIDV4,
    onDelete: 'CASCADE'
  })
  orderId: string;

  @HasOne(() => Order, 'orderId')
  order: Order;
};
