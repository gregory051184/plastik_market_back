import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CityDto, CityEntity, UserEntity} from "@app/common";
import {Like, Repository} from "typeorm";
import {CityUpdateDto} from "@app/common/dto";
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(CityEntity) private readonly citiesRepository: Repository<CityEntity>,
        private readonly usersService: UsersService
    ) {
    }


    async create(cityDto: CityDto): Promise<CityEntity> {
        try {

            const existingCity = await this.getByTitle(cityDto.title);
            if (existingCity.length === 0) {
                const currentUser = await this.usersService.getById(+cityDto.userId);
                if (currentUser.admin) {
                    const city: CityEntity = await this.citiesRepository.create(cityDto);
                    await this.citiesRepository.save(city);
                    return city;
                }
            }
        } catch (error) {
        }

    };

    async getAll(): Promise<CityEntity[]> {
        try {
            const cities: CityEntity[] = await this.citiesRepository.find();
            return cities;
        } catch (error) {
        }
    };

    async getById(id: number): Promise<CityEntity> {
        try {
            //const currentUser: UserEntity = await this.usersService.getByChatId(chatId);
            //if (currentUser.admin) {
            const city: CityEntity = await this.citiesRepository.findOne({where: {id: id}});
            return city;
            //}
        } catch (error) {
        }
    };

    async getByTitle(title: string): Promise<CityEntity[]> {
        try {
            const cities: CityEntity[] = await this.citiesRepository.find({
                where: {title: Like(`${title}%`)},
                relations: ['user']
            });
            return cities;
        } catch (error) {
        }
    };

    async delete(id: number, chatId: string): Promise<void> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId.toString());
            if (currentUser.admin) {
                await this.citiesRepository.delete(id);
            }
        } catch (error) {
        }
    }

    async update(cityUpdateDto: CityUpdateDto, chatId: string): Promise<void> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId.toString());
            if (currentUser.admin) {
                await this.citiesRepository.update(cityUpdateDto.id, {...cityUpdateDto});
            }
        } catch (error) {
        }
    }

}