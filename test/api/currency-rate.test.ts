import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import {
  CurrencyConvertFrom,
  CurrencyConvertTo,
} from '../../src/currency-rate/domain/port/currency-retrieve.port';
import { InMemoryCurrencyRetrieveAdapter } from '../adapters/in-memory-currency-retrieve.adapter';
import * as request from 'supertest';
import { createTestingModule } from './testing.module';

describe('CurrencyRate', () => {
  let app: INestApplication;
  let currencyRetrieveAdapter: InMemoryCurrencyRetrieveAdapter;

  beforeEach(async () => {
    currencyRetrieveAdapter = new InMemoryCurrencyRetrieveAdapter();
    const moduleFixture: TestingModule = await createTestingModule({
      currencyRetrievalPort: currencyRetrieveAdapter,
    });

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return currency rate USD to UAH', () => {
    const givenRate = 8.12;
    currencyRetrieveAdapter.addCurrencyRate(
      CurrencyConvertFrom.USD,
      CurrencyConvertTo.UAH,
      { rate: givenRate },
    );

    return request(app.getHttpServer())
      .get('/api/rate')
      .expect(200)
      .expect('8.12');
  });

  it('should proxy error', () => {
    currencyRetrieveAdapter.addError(new Error());

    return request(app.getHttpServer()).get('/api/rate').expect(500);
  });
});
