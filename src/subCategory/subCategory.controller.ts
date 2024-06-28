import {Body, Controller, Get, Param, Patch, Post} from "@nestjs/common";
import {SubCategoryService} from "./services/subCategory.service";
import {SubCategoryDto, SubCategoryUpdateDto} from "@app/common/dto";
import {SubCategoryEntity} from "@app/common";

@Controller('subcategories')
export class SubCategoryController {
    constructor(
        private readonly subCategoriesService: SubCategoryService
    ) {
    }

    @Post()
    async create(@Body() subCategoryDto: SubCategoryDto): Promise<SubCategoryEntity> {
        return this.subCategoriesService.create(subCategoryDto);
    };

    @Patch('/:chatId')
    async update(@Param('chatId') chatId: string, @Body() subCategoryUpdateDto: SubCategoryUpdateDto): Promise<void> {
        return this.subCategoriesService.update(subCategoryUpdateDto, chatId.toString());
    }

    @Get('/all')
    async getAll(): Promise<SubCategoryEntity[]> {
        return await this.subCategoriesService.getAll();
    };

    @Get(':id')
    async findById(@Param('id') id: number): Promise<SubCategoryEntity> {
        return await this.subCategoriesService.getById(id);
    }

    @Get('/category/:id')
    async getByCategory(@Param('id') id: number): Promise<SubCategoryEntity[]> {
        return await this.subCategoriesService.getByCategory(id)
    }
}