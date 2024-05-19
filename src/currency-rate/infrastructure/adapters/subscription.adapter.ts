import {
  SubscribedUserDto,
  SubscriptionPort,
} from '../../domain/port/subscription.port';
import { SubscribedUser } from './subscription.models';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionAdapter implements SubscriptionPort {
  constructor(
    @InjectModel(SubscribedUser)
    private readonly subscribedUserModel: typeof SubscribedUser,
  ) {}

  async addSubscription(email: string): Promise<void> {
    try {
      await this.subscribedUserModel.create({
        email: email,
      });
    } catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException('Email already exists.', 409);
      }
      throw e;
    }
  }

  async getSubscriptions(): Promise<SubscribedUserDto[]> {
    const models = await this.subscribedUserModel.findAll();
    return models.map((user) => ({
      id: user.id,
      email: user.email,
    }));
  }
}
