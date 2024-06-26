import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {AdvertisementService} from "./services/advertisement.service";
import {AdvertisementDto, AdvertisementEntity} from "@app/common";
import {AdvertisementUpdateDto} from "@app/common/dto";

@Controller('advertisements')
export class AdvertisementController {
    constructor(
        private readonly advertisementService: AdvertisementService
    ) {}

    @Post()
    async create(@Body() advertisementDto: AdvertisementDto): Promise<AdvertisementEntity> {
        return await this.advertisementService.create(advertisementDto);
    };

    @Patch('/:chatId')
    async update(@Param('chatId') chatId: string, @Body() advertisementUpdateDto: AdvertisementUpdateDto): Promise<void> {
        return await this.advertisementService.update(advertisementUpdateDto, chatId);
    };

    @Get('/all')
    async getAll(): Promise<AdvertisementEntity[]> {
        return await this.advertisementService.findAll()
    };

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<AdvertisementEntity> {
        return await this.advertisementService.findById(id);
    };
}
