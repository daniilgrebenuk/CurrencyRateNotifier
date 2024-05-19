export type SubscribedUserDto = {
  id: string;
  email: string;
};

export abstract class SubscriptionPort {
  abstract addSubscription(email: string): Promise<void>;
  abstract getSubscriptions(): Promise<SubscribedUserDto[]>;
}
