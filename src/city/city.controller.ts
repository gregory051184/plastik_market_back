import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CitiesService} from "./services/cities.service";
import {CityDto, CityEntity} from "@app/common";
import {CityUpdateDto} from "@app/common/dto";


@Controller('cities')
export class CityController {
    constructor(private readonly cityService: CitiesService) {
    }

    @Post()
    async create(@Body() cityDto: CityDto): Promise<CityEntity> {
        return await this.cityService.create(cityDto);

    };

    @Patch()
    async update(@Body() cityUpdateDto: CityUpdateDto): Promise<void> {
        return await this.cityService.update(cityUpdateDto);
    };

    @Get('/all')
    async findAll(): Promise<CityEntity[]> {
        return await this.cityService.getAll()
    };

    @Get('/:id')
    async findById(@Param('id') id: number): Promise<CityEntity> {
        return await this.cityService.getById(id)
    };

    @Delete('/:id')
    async delete(@Param('id') id: number): Promise<void> {
        return await this.cityService.delete(id);
    };
}