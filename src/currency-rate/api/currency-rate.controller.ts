import { Controller, Get } from '@nestjs/common';
import { CurrencyRateService } from '../domain/service/currency-rate.service';

@Controller('/api/rate')
export class CurrencyRateController {
  constructor(private readonly currencyRateService: CurrencyRateService) {}
  @Get()
  public async getUsdToUahRate(): Promise<number> {
    return await this.currencyRateService.getUsdToUahRate();
  }
}
