import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "@app/common/entities/user/user.entity";
import {CategoryEntity} from "@app/common/entities/category/category.entity";
import {CityEntity} from "@app/common/entities/city/city.entity";
import {AdvertisementEntity} from "@app/common/entities/advertisement/advertisement.entity";
import {ItemEntity} from "@app/common/entities/item/item.entity";
import {SubscriptionEntity} from "@app/common/entities/subscription/subscription.entity";
import {CartEntity} from "@app/common/entities/cart/cart.entity";
import {SubCategoryEntity} from "@app/common/entities/subCategory/subCategory.entity";
import { config } from 'dotenv';
import * as process from 'node:process';

config();

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                schema: "public",
                host: 'localhost',//process.env.POSTGRES_HOST,
                port: 5432,//+process.env.POSTGRES_PORT,
                username: 'postgres',//process.env.POSTGRES_USER,
                password: 'postgres',//process.env.POSTGRES_PASSWORD,
                database: 'plast_market',//process.env.POSTGRES_PLASTIK_DB,
                synchronize: true,
                autoLoadEntities: true,
                //ssl: true,
                entities: [
                    UserEntity,
                    CategoryEntity,
                    CityEntity,
                    AdvertisementEntity,
                    ItemEntity,
                    SubscriptionEntity,
                    CartEntity,
                    SubCategoryEntity,
                ]
            })
        })
    ]
})
export class PlastikMarketDbModule {
}
