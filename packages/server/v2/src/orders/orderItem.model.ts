import { Column, DataType, Default, ForeignKey, IsUUID, Model, Table, Validate } from 'sequelize-typescript';

import { Meal } from '../meals/meal.model';
import { Order } from './order.model';

@Table
export class OrderItem extends Model<OrderItem | any> {
  
  @Default(1)
  @Validate({
    isInt: true,
    min: 1
  })
  @Column(DataType.INTEGER)
  quantity: number

  @Default(false)
  @Column
  delivered: boolean

  @IsUUID(4)
  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  orderId: string

  @IsUUID(4)
  @ForeignKey(() => Meal)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  mealId: string
};
