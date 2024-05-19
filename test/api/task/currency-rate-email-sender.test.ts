import { INestApplication } from '@nestjs/common';
import { InMemoryCurrencyRetrieveAdapter } from '../../adapters/in-memory-currency-retrieve.adapter';
import { TestingModule } from '@nestjs/testing';
import { createTestingModule } from '../testing.module';
import { InMemoryMailSenderAdapter } from '../../adapters/in-memory-mail-sender.adapter';
import { SubscribedUser } from '../../../src/currency-rate/infrastructure/adapters/subscription.models';
import { CurrencyRateEmailSender } from '../../../src/currency-rate/domain/task/currency-rate-email-sender';
import {
  CurrencyConvertFrom,
  CurrencyConvertTo,
} from '../../../src/currency-rate/domain/port/currency-retrieve.port';

describe('CurrencyRate', () => {
  let app: INestApplication;
  let currencyRetrieveAdapter: InMemoryCurrencyRetrieveAdapter;
  let mailSenderAdapter: InMemoryMailSenderAdapter;

  let currencyRateEmailSender: CurrencyRateEmailSender;

  beforeEach(async () => {
    currencyRetrieveAdapter = new InMemoryCurrencyRetrieveAdapter();
    mailSenderAdapter = new InMemoryMailSenderAdapter();
    const moduleRef: TestingModule = await createTestingModule({
      currencyRetrievalPort: currencyRetrieveAdapter,
      mailSenderPortPort: mailSenderAdapter,
    });

    currencyRateEmailSender = moduleRef.get(CurrencyRateEmailSender);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should send mail with USD to UAH rate to all subscribed users', async () => {
    const givenRate = 8.12;
    const givenDestinations = [
      'test1@gmail.com',
      'test2@gmail.com',
      'test3@gmail.com',
    ];
    await Promise.all(
      givenDestinations.map((email) => SubscribedUser.create({ email: email })),
    );
    currencyRetrieveAdapter.addCurrencyRate(
      CurrencyConvertFrom.USD,
      CurrencyConvertTo.UAH,
      { rate: givenRate },
    );

    await currencyRateEmailSender.sendUsdUahRateToSubscribers();

    expect(mailSenderAdapter.getSendMailCallsAmount()).toEqual(3);
    for (const givenDestination of givenDestinations) {
      expect(mailSenderAdapter.getSentMail(givenDestination)).toEqual({
        body: `${givenRate}`,
        subject: 'Usd to Uah rate',
      });
    }
  });

  it('should not send email if nobody subscribed', async () => {
    await currencyRateEmailSender.sendUsdUahRateToSubscribers();

    expect(mailSenderAdapter.getSendMailCallsAmount()).toEqual(0);
  });
});
