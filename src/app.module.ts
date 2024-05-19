import { Global, Module } from '@nestjs/common';
import { SubscribedUser } from './currency-rate/infrastructure/adapters/subscription.models';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrencyRateModule } from './currency-rate/currency-rate.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ScheduleModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_DATABASE_NAME'),
        models: [SubscribedUser],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CurrencyRateModule,
  ],
})
export class AppModule {}
