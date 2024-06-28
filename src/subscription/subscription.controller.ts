import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {SubscribeDto, SubscriptionEntity} from "@app/common";
import {SubscribeUpdateDto} from "@app/common/dto";
import {SubscribeService} from "./services/subscribe.service";


@Controller('subscribes')
export class SubscriptionController {
    constructor(private readonly subscribeService: SubscribeService) {}

    @Post()
    async create(@Body() subscribeDto: SubscribeDto): Promise<SubscriptionEntity> {
        return await this.subscribeService.create(subscribeDto)
    };

    @Patch('/:chatId')
    async update(@Param('chatId') chatId: string, @Body() subscribeUpdateDto: SubscribeUpdateDto): Promise<void> {
        return await this.subscribeService.update(subscribeUpdateDto, chatId.toString());
    };

    @Get('/all')
    async getAll(@Param('chatId') chatId: string): Promise<SubscriptionEntity[]> {
        return await this.subscribeService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number): Promise<SubscriptionEntity> {
        return await this.subscribeService.getById(id);
    };

}