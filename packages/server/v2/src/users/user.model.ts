import * as bcrypt from 'bcryptjs';
import { AllowNull, BeforeCreate, BeforeUpdate, Column, DataType, Default, HasMany, IsUUID, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { Meal } from '../meals/meal.model';
import { Menu } from '../menu/menu.model';
import { Order } from '../orders/order.model';
import { Notification } from '../notifications/notification.model';
import { UserRoles } from './interfaces/user.interface';

const SALT_ROUNDS = 10;

@Table
export class User extends Model<User | any> {

  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column
  userId: string;

  @Default(null)
  @Column
  firstname: string;

  @Default(null)
  @Column
  lastname: string;

  @AllowNull(false)
  @Unique
  @Column
  email: string;

  @AllowNull(false)
  @Unique
  @Column
  password: string;

  @AllowNull(false)
  @Default('customer')
  @Column(DataType.ENUM('caterer', 'customer', 'admin'))
  role: UserRoles;

  @Default(null)
  @Column
  businessName: string;

  @Default(null)
  @Column
  address: string;

  @Default(null)
  @Column
  phoneNo: string;

  @Column
  passwordResetToken: string;

  @Column(DataType.BIGINT)
  passwordTokenExpiry: string;

  @HasMany(() => Meal)
  meals: Meal[];

  @HasMany(() => Menu)
  menu: Menu[];

  @HasMany(() => Order)
  orders: Order[];

  @HasMany(() => Notification)
  notifications: Notification[];

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    const hash = await bcrypt.hash(instance.password, SALT_ROUNDS);

    instance.password = hash;
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
};
