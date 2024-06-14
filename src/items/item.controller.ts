import {Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ItemService} from "./services/item.service";
import {ItemDto, ItemEntity} from "@app/common";
import {ItemsFilterDto} from "@app/common/dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {ItemUpdateDto} from "@app/common/dto/item/itemUpdate.dto";
import {ItemsBotListsService} from "./services/lists/itemsBotLists.service";
import {FilterService} from "./services/lists/filter.service";
import {AdminService} from "../mainServices/admin.service";


@Controller('items')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        private readonly itemsBotListsService: ItemsBotListsService,
        private readonly filterService: FilterService
    ) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    async create(@Body() itemDto: ItemDto, @UploadedFiles() file?: any): Promise<ItemEntity> {
        return this.itemService.create(file, itemDto)
    };

    @Patch()
    @UseInterceptors(FilesInterceptor('file'))
    async update(@Body() itemUpdateDto: ItemUpdateDto, @UploadedFiles() file?: any): Promise<void> {
        return await this.itemService.update(itemUpdateDto, file);
    };

    @Get('/all')
    async getAll(): Promise<ItemEntity[]> {
        return await this.itemService.getAll()
    };

    @Get('/filters')
    async filter(@Body() data: ItemsFilterDto) {
        return this.filterService.itemFilter(data, data.forSale);

    };

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<ItemEntity> {
        return await this.itemService.getById(id);
    };

}