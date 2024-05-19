import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { createTestingModule } from './testing.module';
import { SubscribedUser } from '../../src/currency-rate/infrastructure/adapters/subscription.models';

describe('Subscription', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await createTestingModule();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should subscribe user', () => {
    const givenEmail = 'test1@gmail.com';

    return request(app.getHttpServer())
      .post('/api/subscribe')
      .send(`email=${givenEmail}`)
      .expect(200);
  });

  it('should return 400 if email is incorrect', () => {
    const givenEmail = 'test1@gmail';

    return request(app.getHttpServer())
      .post('/api/subscribe')
      .send(`email=${givenEmail}`)
      .expect(400);
  });

  it('should return 409 if email already exist', () => {
    const givenEmail = 'test1@gmail.com';
    SubscribedUser.create({
      email: givenEmail,
    });

    return request(app.getHttpServer())
      .post('/api/subscribe')
      .send(`email=${givenEmail}`)
      .expect(409);
  });
});
