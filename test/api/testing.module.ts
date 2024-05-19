import { Test } from '@nestjs/testing';
import { CurrencyRetrievePort } from '../../src/currency-rate/domain/port/currency-retrieve.port';
import { MailSenderPort } from '../../src/currency-rate/domain/port/mail-sender.port';
import { SequelizeModule } from '@nestjs/sequelize';
import { CurrencyRateModule } from '../../src/currency-rate/currency-rate.module';
import { InMemoryCurrencyRetrieveAdapter } from '../adapters/in-memory-currency-retrieve.adapter';
import { InMemoryMailSenderAdapter } from '../adapters/in-memory-mail-sender.adapter';

export const createTestingModule = ({
  currencyRetrievalPort = new InMemoryCurrencyRetrieveAdapter(),
  mailSenderPortPort = new InMemoryMailSenderAdapter(),
}: {
  currencyRetrievalPort?: CurrencyRetrievePort;
  mailSenderPortPort?: MailSenderPort;
} = {}) =>
  Test.createTestingModule({
    imports: [
      CurrencyRateModule,
      SequelizeModule.forRoot({
        dialect: 'sqlite',
        autoLoadModels: true,
        omitNull: true,
        synchronize: true,
      }),
    ],
  })
    .overrideProvider(CurrencyRetrievePort)
    .useValue(currencyRetrievalPort)
    .overrideProvider(MailSenderPort)
    .useValue(mailSenderPortPort)
    .compile();
