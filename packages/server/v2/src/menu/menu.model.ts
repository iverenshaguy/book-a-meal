import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, HasOne, IsUUID, Model, PrimaryKey, Table, Unique, Validate } from 'sequelize-typescript';

import { User } from '../users/user.model';
import { Meal } from '../meals/meal.model';
import { MenuMeal } from './menuMeal.model';
import { Notification } from '../notifications/notification.model';

@Table({ freezeTableName: true })
export class Menu extends Model<Menu | any> {

  @IsUUID(4)
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column
  menuId: string;

  @AllowNull(false)
  @Validate({ isDate: true })
  @Column(DataType.DATEONLY)
  date: Date;

  @Default(null)
  @Column
  lastname: string;

  @IsUUID(4)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUIDV4,
    onDelete: 'CASCADE'
  })
  userId: string;

  @BelongsTo(() => User, 'userId')
  caterer: User;

  @BelongsToMany(() => Meal, () => MenuMeal, 'menuId')
  meals: Meal[];

  @HasOne(() => Notification, 'menuId')
  notifications: Notification[];
};
