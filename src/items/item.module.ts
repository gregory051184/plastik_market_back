import {forwardRef, Module} from '@nestjs/common';
import {ItemController} from "./item.controller";
import {ItemService} from "./services/item.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommonModule, ItemEntity, PlastikMarketDbModule, SubscriptionEntity} from "@app/common";
import {ItemsBotListsService} from "./services/lists/itemsBotLists.service";
import {ItemsBotItemService} from "./services/items/itemsBotItem.service";
import {ItemsBotFormsService} from "./services/forms/itemsBotForms.service";
import {FilterService} from "./services/lists/filter.service";
import {CategoryModule} from "../category/category.module";
import {CityModule} from "../city/city.module";
import {UsersModule} from "../users/users.module";
import {CartModule} from "../cart/cart.module";
import {SubCategoryModule} from "../subCategory/subCategory.module";
import {AdvertisementModule} from "../advertisement/advertisement.module";
import {SubscriptionModule} from "../subscription/subscription.module";
import {TasksService} from "../task/tasks.service";


@Module({
    imports: [
        forwardRef(() =>UsersModule),
        //UsersModule,
        TypeOrmModule.forFeature([ItemEntity]),
        PlastikMarketDbModule,
        CommonModule,
        CategoryModule,
        CityModule,
        SubCategoryModule,
        forwardRef(() =>SubscriptionModule),
        forwardRef(() => AdvertisementModule),
        //CartModule,
        forwardRef(() => CartModule)


    ],
    controllers: [ItemController],
    providers: [
        ItemService,
        ItemsBotListsService,
        ItemsBotItemService,
        ItemsBotFormsService,
        FilterService,
        TasksService
    ],
    exports: [
        ItemService,
        ItemsBotListsService,
        ItemsBotItemService,
        ItemsBotFormsService,
        FilterService
    ]
})
export class ItemModule {
}