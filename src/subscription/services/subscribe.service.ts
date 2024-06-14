import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SubscribeDto, SubscriptionEntity} from "@app/common";
import {Like, Repository} from "typeorm";
import {SubscribeUpdateDto} from "@app/common/dto";

@Injectable()
export class SubscribeService {
    constructor(
        @InjectRepository(SubscriptionEntity) private readonly subscribesRepository: Repository<SubscriptionEntity>
    ) {
    }

    async create(subscribeDto: SubscribeDto): Promise<SubscriptionEntity> {
        const subscribe: SubscriptionEntity = await this.subscribesRepository.create(subscribeDto);
        await this.subscribesRepository.save(subscribeDto);
        return subscribe;
    };

    async getAll(): Promise<SubscriptionEntity[]> {
        const subscribes: SubscriptionEntity[] = await this.subscribesRepository.find();
        return subscribes;
    };

    async getById(id: number): Promise<SubscriptionEntity> {
        const subscribe: SubscriptionEntity = await this.subscribesRepository.findOne({where: {id: id}});
        return subscribe;
    }


    async getByTitle(title: string): Promise<SubscriptionEntity[]> {
        const subscribes: SubscriptionEntity[] = await this.subscribesRepository.find({where: {title: Like(`${title}%`)}});
        return subscribes;
    };

    async delete(id: number): Promise<void> {
        await this.subscribesRepository.delete(id);
    }

    async update(subscribeUpdateDto: SubscribeUpdateDto): Promise<void> {
        await this.subscribesRepository.update(subscribeUpdateDto.id, {...subscribeUpdateDto});
    }

}