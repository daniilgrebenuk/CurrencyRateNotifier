import { Injectable } from '@nestjs/common';
import { SubscriptionPort } from '../port/subscription.port';

@Injectable()
export class SubscriptionService {
  constructor(private readonly subscriptionPort: SubscriptionPort) {}

  public async subscribeUser(email: string) {
    await this.subscriptionPort.addSubscription(email);
  }
}
