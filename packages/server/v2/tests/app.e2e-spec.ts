import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app/app.module';
import { validationPipe } from './utils/setup';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(validationPipe);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /', (done) => {
    request(app.getHttpServer())
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        expect(res.body.message).toEqual('Welcome to Book A Meal')

        done();
      });
  });

  it('GET /api', (done) => {
    request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        expect(res.body.message).toEqual('Welcome to the Book A Meal API')

        done();
      });
  });

  it('GET /api/v2', (done) => {
    request(app.getHttpServer())
      .get('/api/v2')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;

        expect(res.body.message).toEqual('Welcome to version 2 of the Book A Meal API')

        done();
      });
  });
});
