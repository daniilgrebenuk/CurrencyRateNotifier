import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  CurrencyConvertFrom,
  CurrencyConvertTo,
  CurrencyRetrievePort,
} from '../port/currency-retrieve.port';
import { SubscriptionPort } from '../port/subscription.port';
import { MailSenderPort } from '../port/mail-sender.port';

@Injectable()
export class CurrencyRateEmailSender {
  private readonly logger = new Logger(CurrencyRateEmailSender.name);
  constructor(
    private readonly mailSenderPort: MailSenderPort,
    private readonly currencyRetrievePort: CurrencyRetrievePort,
    private readonly subscriptionPort: SubscriptionPort,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async sendUsdUahRateToSubscribers() {
    this.logger.log('Sending current usd to uah exchange rate to users.');
    const [currencyRate, subscribers] = await Promise.all([
      this.currencyRetrievePort.getRate(
        CurrencyConvertFrom.USD,
        CurrencyConvertTo.UAH,
      ),
      this.subscriptionPort.getSubscriptions(),
    ]);

    await Promise.all(
      subscribers.map((subscriber) => {
        return this.mailSenderPort.sendMail(subscriber.email, {
          subject: 'Usd to Uah rate',
          body: `${currencyRate.rate}`,
        });
      }),
    );
  }
}
