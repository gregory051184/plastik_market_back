import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CommonModule,
  PlastikMarketDbModule,
  SubscriptionEntity,
} from '@app/common';
import { SubscribesBotListService } from './services/lists/subscribesBotList.service';
import { SubscribeBotItemService } from './services/items/subscribeBot.item.service';
import { SubscribeService } from './services/subscribe.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity]),
    UsersModule,
    PlastikMarketDbModule,
    CommonModule,
  ],
  controllers: [SubscriptionController],
  providers: [
    SubscribeService,
    SubscribesBotListService,
    SubscribeBotItemService,
  ],
  exports: [
    SubscribeService,
    SubscribesBotListService,
    SubscribeBotItemService,
  ],
})
export class SubscriptionModule {}
