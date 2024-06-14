import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AdvertisementDto, AdvertisementEntity} from "@app/common";
import {Repository} from "typeorm";
import {AdvertisementUpdateDto} from "@app/common/dto";

@Injectable()
export class AdvertisementService {
    constructor(
        @InjectRepository(AdvertisementEntity) private readonly advertisementsRepository: Repository<AdvertisementEntity>
    ) {
    }

    async create(advertisementDto: AdvertisementDto): Promise<AdvertisementEntity> {
        const advertisement: AdvertisementEntity = await this.advertisementsRepository.create(advertisementDto);
        return advertisement;
    };

    async update(advertisementUpdateDto: AdvertisementUpdateDto): Promise<void> {
        await this.advertisementsRepository.update(advertisementUpdateDto.id, {...advertisementUpdateDto});
    }

    async findAll(): Promise<AdvertisementEntity[]> {
        const advertisements: AdvertisementEntity[] = await this.advertisementsRepository.find();
        return advertisements;
    };

    async findById(id: number): Promise<AdvertisementEntity> {
        const advertisement: AdvertisementEntity = await this.advertisementsRepository.findOne({where: {id: id}});
        return advertisement;
    };

    async delete(id: number): Promise<void> {
        await this.advertisementsRepository.delete(id);
    }
}