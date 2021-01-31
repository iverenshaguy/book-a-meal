import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';

@Module({
  providers: [MealsService],
  controllers: [MealsController]
})
export class MealsModule {}
