import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/common/entities/user/user.entity';
import { CategoryEntity } from '@app/common/entities/category/category.entity';
import { CityEntity } from '@app/common/entities/city/city.entity';
import { AdvertisementEntity } from '@app/common/entities/advertisement/advertisement.entity';
import { ItemEntity } from '@app/common/entities/item/item.entity';
import { SubscriptionEntity } from '@app/common/entities/subscription/subscription.entity';
import { CartEntity } from '@app/common/entities/cart/cart.entity';
import { SubCategoryEntity } from '@app/common/entities/subCategory/subCategory.entity';
import { config } from 'dotenv';
import * as process from 'node:process';

config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        schema: 'public',
        host: process.env.POSTGRES_HOST_DEP, //'dpg-cpfjk8n109ks73blre7g-a.frankfurt-postgres.render.com',
        port: +process.env.POSTGRES_PORT_DEP,
        username: 'plastik_market_db_q55u_user',
        password: process.env.POSTGRES_PASSWORD_DEP,
        database: process.env.POSTGRES_PLASTIK_DB_DEP,
        /*database: configService.get('POSTGRES_PLASTIK_DB'),
        port: +configService.get('POSTGRES_PORT'),
        host: configService.get('POSTGRES_HOST'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),*/
        synchronize: true,
        autoLoadEntities: true,
        ssl: true,
        entities: [
          UserEntity,
          CategoryEntity,
          CityEntity,
          AdvertisementEntity,
          ItemEntity,
          SubscriptionEntity,
          CartEntity,
          SubCategoryEntity,
        ],
      }),
    }),
  ],
})
export class PlastikMarketDbModule {}
