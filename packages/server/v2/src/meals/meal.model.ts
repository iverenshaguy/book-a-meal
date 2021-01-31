import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { User } from '../users/user.model';
import { Menu } from '../menu/menu.model';
import { MenuMeal } from '../menu/menuMeal.model';
import { Order } from '../orders/order.model';
import { OrderItem } from '../orders/orderItem.model';

@Table({ paranoid: true })
export class Meal extends Model<Meal | any> {

  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  mealId: string;

  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Default('https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg')
  @Column(DataType.TEXT)
  imageUrl: string;

  @Column(DataType.TEXT)
  description: string;

  @Default(false)
  @Column
  vegetarian: boolean;

  @AllowNull(false)
  @Column(DataType.DECIMAL(10, 2))
  price: number;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE'
  })
  userId: string;

  @BelongsTo(() => User, 'userId')
  caterer: User;

  @BelongsToMany(() => Menu, () => MenuMeal, 'mealId')
  menu: Menu[];

  @BelongsToMany(() => Order, () => OrderItem, 'menuId')
  orders: Order[];
};
