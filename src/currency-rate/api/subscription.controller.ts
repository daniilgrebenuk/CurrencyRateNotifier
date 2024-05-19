import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { SubscriptionService } from '../domain/service/subscription.service';

@Controller('/api')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/subscribe')
  @HttpCode(200)
  public async subscribe(@Body() request: SubscribeUserRequest) {
    if (!isValidEmail(request.email)) {
      throw new HttpException(`Email '${request.email}' is not valid.`, 400);
    }
    return this.subscriptionService.subscribeUser(request.email);
  }
}

type SubscribeUserRequest = {
  email: string;
};

const isValidEmail = (email: string): boolean => {
  return (
    !!email &&
    !!email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  );
};
