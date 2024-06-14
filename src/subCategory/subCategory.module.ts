import {Module} from "@nestjs/common";
import {SubCategoryController} from "./subCategory.controller";
import {CommonModule, SubCategoryEntity} from "@app/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubCategoryService} from "./services/subCategory.service";
import {SubCategoriesFormsService} from "./services/forms/subCategoriesForms.service";
import {CategoryModule} from "../category/category.module";
import {SubCategoriesBotListService} from "./services/lists/subCategoriesBotList.service";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([SubCategoryEntity]),
            CommonModule,
            CategoryModule
        ],
        providers: [SubCategoryService, SubCategoriesFormsService, SubCategoriesBotListService],
        controllers: [SubCategoryController],
        exports: [SubCategoryService, SubCategoriesFormsService, SubCategoriesBotListService]
    }
)
export class SubCategoryModule {}