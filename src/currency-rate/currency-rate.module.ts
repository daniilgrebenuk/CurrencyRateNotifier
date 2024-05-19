import { Module } from '@nestjs/common';
import { CurrencyRateController } from './api/currency-rate.controller';
import { SubscriptionController } from './api/subscription.controller';
import { CurrencyRetrievePort } from './domain/port/currency-retrieve.port';
import { CurrencyRetrieveAdapter } from './infrastructure/adapters/currency-retrieve.adapter';
import { SubscriptionPort } from './domain/port/subscription.port';
import { SubscriptionAdapter } from './infrastructure/adapters/subscription.adapter';
import { MailSenderPort } from './domain/port/mail-sender.port';
import { MailSenderAdapter } from './infrastructure/adapters/mail-sender.adapter';
import { CurrencyRateService } from './domain/service/currency-rate.service';
import { SubscriptionService } from './domain/service/subscription.service';
import { CurrencyRateEmailSender } from './domain/task/currency-rate-email-sender';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubscribedUser } from './infrastructure/adapters/subscription.models';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, SequelizeModule.forFeature([SubscribedUser])],
  controllers: [CurrencyRateController, SubscriptionController],
  providers: [
    { provide: CurrencyRetrievePort, useClass: CurrencyRetrieveAdapter },
    { provide: SubscriptionPort, useClass: SubscriptionAdapter },
    { provide: MailSenderPort, useClass: MailSenderAdapter },
    CurrencyRateService,
    SubscriptionService,
    CurrencyRateEmailSender,
  ],
})
export class CurrencyRateModule {}
