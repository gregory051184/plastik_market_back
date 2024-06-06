import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityDto, CityEntity } from '@app/common';
import { Like, Repository } from 'typeorm';
import { CityUpdateDto } from '@app/common/dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly citiesRepository: Repository<CityEntity>,
  ) {}

  async create(cityDto: CityDto): Promise<CityEntity> {
    const city: CityEntity = await this.citiesRepository.create(cityDto);
    await this.citiesRepository.save(city);
    return city;
  }

  async getAll(): Promise<CityEntity[]> {
    const cities: CityEntity[] = await this.citiesRepository.find();
    return cities;
  }

  async getById(id: number): Promise<CityEntity> {
    const city: CityEntity = await this.citiesRepository.findOne({
      where: { id: id },
    });
    return city;
  }

  async getByTitle(title: string): Promise<CityEntity[]> {
    const cities: CityEntity[] = await this.citiesRepository.find({
      where: { title: Like(`${title}%`) },
    });
    return cities;
  }

  async delete(id: number): Promise<void> {
    await this.citiesRepository.delete(id);
  }

  async update(cityUpdateDto: CityUpdateDto): Promise<void> {
    await this.citiesRepository.update(cityUpdateDto.id, { ...cityUpdateDto });
  }
}
