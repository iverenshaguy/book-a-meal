import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  root() {
    return {
      message: 'Welcome to Book A Meal',
    };
  }

  @Get('/api')
  apiRoot() {
    return {
      message: 'Welcome to the Book A Meal API',
      v1: '/api/v1',
      v2: '/api/v2'
    };
  }

  @Get('/api/v2')
  v2() {
    return {
      message: 'Welcome to version 2 of the Book A Meal API'
    };
  }
}
