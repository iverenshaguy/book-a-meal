import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

import { AppModule } from './app/app.module';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      return new BadRequestException({
        errors: errors.reduce((acc,error) => {
          acc[error.property] = {
            "location": "body", // TODO change when Error object is well understood,
            "param": error.property,
            "value": error.value,
            "msg": Object.entries(error.constraints)[0][1]
          }

          return acc;
        }, {})
      });
    }
  }));
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
