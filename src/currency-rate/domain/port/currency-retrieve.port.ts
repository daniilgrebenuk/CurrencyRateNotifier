export type CurrencyRate = {
  rate: number;
};

export const enum CurrencyConvertFrom {
  USD = 'USD',
}

export const enum CurrencyConvertTo {
  UAH = 'UAH',
}

export abstract class CurrencyRetrievePort {
  abstract getRate(
    from: CurrencyConvertFrom,
    to: CurrencyConvertTo,
  ): Promise<CurrencyRate>;
}
