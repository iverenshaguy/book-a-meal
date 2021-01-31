import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app/app.module';

config();

async function bootstrap() {
  // TODO: update cors options ot make app more secure
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(helmet());
  // app.use(csurf());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

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
  // await app.listen(process.env.PORT || 8000);

  await app.listen(8002);
}
bootstrap();
