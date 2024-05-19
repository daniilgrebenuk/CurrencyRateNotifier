import { Injectable } from '@nestjs/common';
import {
  CurrencyConvertFrom,
  CurrencyConvertTo,
  CurrencyRetrievePort,
} from '../port/currency-retrieve.port';

@Injectable()
export class CurrencyRateService {
  constructor(private readonly currencyRetrievePort: CurrencyRetrievePort) {}

  public async getUsdToUahRate(): Promise<number> {
    const rate = await this.currencyRetrievePort.getRate(
      CurrencyConvertFrom.USD,
      CurrencyConvertTo.UAH,
    );
    return rate.rate;
  }
}
