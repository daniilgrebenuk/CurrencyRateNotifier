import {
  CurrencyConvertFrom,
  CurrencyConvertTo,
  CurrencyRate,
  CurrencyRetrievePort,
} from '../../src/currency-rate/domain/port/currency-retrieve.port';

export class InMemoryCurrencyRetrieveAdapter implements CurrencyRetrievePort {
  private currencyRates: Record<string, CurrencyRate> = {};
  private error: Error | undefined;

  getRate(
    from: CurrencyConvertFrom,
    to: CurrencyConvertTo,
  ): Promise<CurrencyRate> {
    if (this.error) {
      throw this.error;
    }
    return Promise.resolve(this.currencyRates[from + to]);
  }

  addCurrencyRate(
    from: CurrencyConvertFrom,
    to: CurrencyConvertTo,
    rate: CurrencyRate,
  ) {
    this.currencyRates[from + to] = rate;
  }

  addError(error: Error) {
    this.error = error;
  }
}
