import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {CategoryService} from "./services/category.service";
import {CategoryDto, CategoryEntity} from "@app/common";
import {CategoryUpdateDto} from "@app/common/dto";



@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoriesService: CategoryService
    ) {
    }

    @Post()
    async create(@Body() categoryDto: CategoryDto): Promise<CategoryEntity> {
        return await this.categoriesService.create(categoryDto);
    };

    @Patch()
    async update(@Body() categoryUpdateDto: CategoryUpdateDto): Promise<void> {
        return await this.categoriesService.update(categoryUpdateDto);
    }

    @Get('/all')
    async findAll(): Promise<CategoryEntity[]> {
        return await this.categoriesService.getAll()
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<CategoryEntity> {
        return await this.categoriesService.getById(id)
    }

}