import {forwardRef, Module} from '@nestjs/common';
import {CategoryController} from "./category.controller";
import {CategoryService} from "./services/category.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CategoryEntity, CommonModule, PlastikMarketDbModule} from "@app/common";
import {CategoriesBotListsService} from "./services/lists/categoriesBotLists.service";
import {CategoriesBotFormsService} from "./services/forms/categoriesBotForms.service";
import {UsersModule} from "../users/users.module";


@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryEntity]),
        PlastikMarketDbModule,
        CommonModule,
        forwardRef(() =>UsersModule),
    ],
    controllers: [CategoryController],
    providers: [CategoryService, CategoriesBotListsService, CategoriesBotFormsService],
    exports: [CategoryService, CategoriesBotListsService, CategoriesBotFormsService],
})
export class CategoryModule {}