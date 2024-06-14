import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {
    AdvertisementEntity,
    CartEntity,
    CategoryEntity, CityEntity,
    CommonModule, ItemEntity,
    PlastikMarketDbModule, SubCategoryEntity,
    SubscriptionEntity,
    UserEntity
} from "@app/common";
import {AdvertisementService} from "./advertisement/services/advertisement.service";
import {CartService} from "./cart/services/cart.service";
import {CitiesService} from "./city/services/cities.service";
import {CategoryService} from "./category/services/category.service";
import {ItemService} from "./items/services/item.service";
import {UsersService} from "./users/services/users.service";
import {UsersBotListsService} from "./users/services/lists/usersBotLists.service";
import {ItemsBotListsService} from "./items/services/lists/itemsBotLists.service";
import {AdvertisementController} from "./advertisement/advertisement.controller";
import {CartController} from "./cart/cart.controller";
import {CityController} from "./city/city.controller";
import {CategoryController} from "./category/category.controller";
import {ItemController} from "./items/item.controller";
import {SubscriptionController} from "./subscription/subscription.controller";
import {UsersController} from "./users/users.controller";
import {MainService} from "./mainServices/main.service";
import {UsersBotItemsService} from "./users/services/items/usersBotItems.service";
import {UsersFormsService} from "./users/services/forms/usersForms.service";
import {CitiesBotListService} from "./city/services/lists/citiesBotList.service";
import {CategoriesBotListsService} from "./category/services/lists/categoriesBotLists.service";
import {CartsFormsService} from "./cart/services/forms/cartsForms.service";
import {CartsBotItemService} from "./cart/services/items/cartsBotItem.service";
import {AdvertisementsItemsService} from "./advertisement/services/items/advertisementsItems.service";
import {ItemsBotItemService} from "./items/services/items/itemsBotItem.service";
import {ItemsBotFormsService} from "./items/services/forms/itemsBotForms.service";
import {UserService} from "./mainServices/user.service";
import {AdminService} from "./mainServices/admin.service";
import {FilterService} from "./items/services/lists/filter.service";
import {CartModule} from "./cart/cart.module";
import {UsersModule} from "./users/users.module";
import {ItemModule} from "./items/item.module";
import {CityModule} from "./city/city.module";
import {CategoryModule} from "./category/category.module";
import {AdvertisementModule} from "./advertisement/advertisement.module";
import {SubscriptionModule} from "./subscription/subscription.module";
import {SubCategoryService} from "./subCategory/services/subCategory.service";
import {SubCategoryModule} from "./subCategory/subCategory.module";
import {SubCategoriesFormsService} from "./subCategory/services/forms/subCategoriesForms.service";
import {CategoriesBotFormsService} from "./category/services/forms/categoriesBotForms.service";
import {SubCategoryController} from "./subCategory/subCategory.controller";
import {SubscribeService} from "./subscription/services/subscribe.service";
/*import {MainServicesModule} from "./mainServices/mainServices.module";
import {MainServicesController} from "./mainServices/mainServices.controller";*/


@Module({
    imports: [
        //MainServicesModule,
        CommonModule,
        PlastikMarketDbModule,
        UsersModule,
        ItemModule,
        CartModule,
        CityModule,
        CategoryModule,
        AdvertisementModule,
        SubscriptionModule,
        SubCategoryModule,
        TypeOrmModule.forFeature([
            AdvertisementEntity,
            CityEntity,
            ItemEntity,
            UserEntity,
            CategoryEntity,
            SubscriptionEntity,
            CartEntity,
            SubCategoryEntity,
            //ItemCartEntity
        ]),
    ],
    controllers: [
        //MainServicesController,
        AppController,
        AdvertisementController,
        CartController,
        CityController,
        CategoryController,
        ItemController,
        SubscriptionController,
        UsersController,
        SubCategoryController
    ],
    providers: [
        AdvertisementService,
        AdvertisementsItemsService,
        CartService,
        CartsFormsService,
        CartsBotItemService,
        CitiesService,
        CitiesBotListService,
        CategoryService,
        CategoriesBotListsService,
        ItemService,
        SubscribeService,
        UsersService,
        UsersBotListsService,
        UsersBotItemsService,
        UsersFormsService,
        ItemsBotListsService,
        ItemsBotItemService,
        ItemsBotFormsService,
        MainService,
        UserService,
        AdminService,
        FilterService,
        SubCategoryService,
        SubCategoriesFormsService,
        CategoriesBotFormsService
    ]
})
export class AppModule {
}
