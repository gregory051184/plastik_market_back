import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SubscribeDto, SubscriptionEntity} from "@app/common";
import {Like, Repository} from "typeorm";
import {SubscribeUpdateDto} from "@app/common/dto";
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class SubscribeService {
    constructor(
        @InjectRepository(SubscriptionEntity) private readonly subscribesRepository: Repository<SubscriptionEntity>,
        private readonly usersService: UsersService
    ) {
    }

    async create(subscribeDto: SubscribeDto): Promise<SubscriptionEntity> {
        try {
            const existingSubscribe = await this.getByTitle(subscribeDto.title);
            if (existingSubscribe.length === 0) {
                const currentUser = await this.usersService.getById(+subscribeDto.userId);
                if (currentUser.admin) {
                    const subscribe: SubscriptionEntity = await this.subscribesRepository.create(subscribeDto);
                    await this.subscribesRepository.save(subscribe);
                    return subscribe;
                }
            }
        } catch (error) {
        }

    };

    async getAll(): Promise<SubscriptionEntity[]> {
        try {
            const subscribes: SubscriptionEntity[] = await this.subscribesRepository.find();
            return subscribes;
        } catch (error) {
        }
    };

    async getById(id: number): Promise<SubscriptionEntity> {
        try {
            const subscribe: SubscriptionEntity = await this.subscribesRepository.findOne({where: {id: id}});
            return subscribe;
        } catch (error) {
        }
    }


    async getByTitle(title: string): Promise<SubscriptionEntity[]> {
        try {
            const subscribes: SubscriptionEntity[] = await this.subscribesRepository.find({where: {title: Like(`${title}%`)}});
            return subscribes;
        } catch (error) {
        }
    };

    async delete(id: number): Promise<void> {
        try {
            await this.subscribesRepository.delete(id);
        } catch (error) {
        }
    };

    async update(subscribeUpdateDto: SubscribeUpdateDto, chatId: string): Promise<void> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId);
            if (currentUser.admin) {
                await this.subscribesRepository.update(subscribeUpdateDto.id, {
                    title: subscribeUpdateDto.title,
                    description: subscribeUpdateDto.description,
                    price: subscribeUpdateDto.price,
                    months: subscribeUpdateDto.months,
                    itemsNumber: subscribeUpdateDto.itemsNumber
                });
            }
        } catch (error) {
        }
    }

}