import { Column, DataType, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';

import { Menu } from './menu.model';
import { Meal } from '../meals/meal.model';

@Table
export class MenuMeal extends Model<MenuMeal | any> {

  @IsUUID(4)
  @ForeignKey(() => Meal)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  mealId: string

  @IsUUID(4)
  @ForeignKey(() => Menu)
  @Column({
    type: DataType.UUID,
    onDelete: 'CASCADE',
  })
  menuId: string
};
