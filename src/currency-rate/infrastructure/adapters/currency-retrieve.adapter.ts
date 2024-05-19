import {
  CurrencyConvertFrom,
  CurrencyConvertTo,
  CurrencyRate,
  CurrencyRetrievePort,
} from '../../domain/port/currency-retrieve.port';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CurrencyRetrieveAdapter implements CurrencyRetrievePort {
  private readonly currencyRateBaseUrl: string;
  private readonly currencyRateToken: string;
  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.currencyRateBaseUrl = configService.getOrThrow('CURRENCY_RATE_URL');
    this.currencyRateToken = configService.getOrThrow('CURRENCY_RATE_TOKEN');
  }

  async getRate(
    from: CurrencyConvertFrom,
    to: CurrencyConvertTo,
  ): Promise<CurrencyRate> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.currencyRateBaseUrl}/${from}/${to}`, {
        headers: {
          Accept: 'application/json',
          'X-CoinAPI-Key': this.currencyRateToken,
        },
      }),
    );
    const body = response.data;
    if (!('rate' in body)) throw new Error();

    return { rate: body.rate };
  }
}
