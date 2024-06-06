import { Module } from '@nestjs/common';
import { AdvertisementController } from './advertisement.controller';
import { AdvertisementService } from './services/advertisement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AdvertisementEntity,
  CommonModule,
  PlastikMarketDbModule,
} from '@app/common';
import { AdvertisementsItemsService } from './services/items/advertisementsItems.service';
import { ItemModule } from '../items/item.module';
import { AdvertisementsBotListService } from './services/lists/advertisementsBotList.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdvertisementEntity]),
    PlastikMarketDbModule,
    CommonModule,
    ItemModule,
    UsersModule,
  ],
  controllers: [AdvertisementController],
  providers: [
    AdvertisementService,
    AdvertisementsItemsService,
    AdvertisementsBotListService,
  ],
  exports: [
    AdvertisementService,
    AdvertisementsItemsService,
    AdvertisementsBotListService,
  ],
})
export class AdvertisementModule {}
