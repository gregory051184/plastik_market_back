import {Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {ItemService} from "./services/item.service";
import {ItemDto, ItemEntity} from "@app/common";
import {CheckFileDto, ItemsFilterDto} from "@app/common/dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {ItemUpdateDto} from "@app/common/dto/item/itemUpdate.dto";
import {ItemsBotListsService} from "./services/lists/itemsBotLists.service";
import {FilterService} from "./services/lists/filter.service";
import {TasksService} from "../task/tasks.service";


@Controller('items')
export class ItemController {
    constructor(
        private readonly itemService: ItemService,
        private readonly itemsBotListsService: ItemsBotListsService,
        private readonly filterService: FilterService,
        private readonly tasksService: TasksService,
    ) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor('file'))
    async create(@Body() itemDto: ItemDto, @UploadedFiles() file?: any): Promise<ItemEntity> {
        console.log(file);
        return this.itemService.create(file, itemDto)
    };

    @Patch()
    @UseInterceptors(FilesInterceptor('file'))
    async update(@Body() itemUpdateDto: ItemUpdateDto, @UploadedFiles() file?: any): Promise<void> {
        console.log(file);
        return await this.itemService.update(itemUpdateDto, file);
    };

    @Get('/all/:chatId')
    async getAll(@Param('chatId') chatId: string): Promise<ItemEntity[]> {
        return await this.itemService.getAll(chatId)
    };

    @Get('/filters')
    async filter(@Body() data: ItemsFilterDto) {
        return this.filterService.itemFilter(data, data.forSale);

    };

    @Get('/check/file')
    async checkFile(@Body() data: CheckFileDto):Promise<boolean> {
        return this.itemService.getExistingFileName(data);
    };

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<ItemEntity> {
        return await this.itemService.getById(id);
    };

}