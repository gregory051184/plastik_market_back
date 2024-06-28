import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AdvertisementDto, AdvertisementEntity} from "@app/common";
import {Repository} from "typeorm";
import {AdvertisementUpdateDto} from "@app/common/dto";
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class AdvertisementService {
    constructor(
        @InjectRepository(AdvertisementEntity) private readonly advertisementsRepository: Repository<AdvertisementEntity>,
        private readonly usersService: UsersService
    ) {
    }

    async create(advertisementDto: AdvertisementDto): Promise<AdvertisementEntity> {
        try {
            const existingAdvertisement = await this.findByTitle(advertisementDto.title);
            if (!existingAdvertisement) {
                const currentUser = await this.usersService.getById(advertisementDto.userId);
                if (currentUser.admin) {
                    const advertisement: AdvertisementEntity = await this.advertisementsRepository.create(advertisementDto);
                    console.log(advertisement)
                    await this.advertisementsRepository.save(advertisement);
                    return advertisement;
                }
            }
        } catch (error) {

        }

    };

    async update(advertisementUpdateDto: AdvertisementUpdateDto, chatId: string): Promise<void> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId.toString());
            if (currentUser.admin) {
                await this.advertisementsRepository.update(advertisementUpdateDto.id, {...advertisementUpdateDto});
            }
        } catch (error) {
        }
    }

    async findAll(): Promise<AdvertisementEntity[]> {
        try {
                const advertisements: AdvertisementEntity[] = await this.advertisementsRepository.find();
                return advertisements;
        } catch (error) {
        }
    };

    async findById(id: number): Promise<AdvertisementEntity> {
        try {
            const advertisement: AdvertisementEntity = await this.advertisementsRepository.findOne({where: {id: id}});
            return advertisement;
        } catch (error) {
        }
    };

    async findByTitle(title: string): Promise<AdvertisementEntity> {
        try {
            const advertisement: AdvertisementEntity = await this.advertisementsRepository.findOne({where: {title: title}});
            return advertisement;
        } catch (error) {
        }
    };

    async delete(id: number): Promise<void> {
        try {
            await this.advertisementsRepository.delete(id);
        } catch (error) {
        }
    }
}