import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto, CategoryEntity } from '@app/common';
import { Repository } from 'typeorm';
import { CategoryUpdateDto } from '@app/common/dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoriesRepository: Repository<CategoryEntity>,
  ) {}

  async create(categoryDto: CategoryDto): Promise<CategoryEntity> {
    const category: CategoryEntity = await this.categoriesRepository.create(
      categoryDto,
    );
    await this.categoriesRepository.save(category);
    return category;
  }

  async getAll(): Promise<CategoryEntity[]> {
    const categories: CategoryEntity[] = await this.categoriesRepository.find();
    return categories;
  }

  async getById(id: number): Promise<CategoryEntity> {
    const category: CategoryEntity = await this.categoriesRepository.findOne({
      where: { id: id },
    });
    return category;
  }

  async update(categoryUpdateDto: CategoryUpdateDto): Promise<void> {
    await this.categoriesRepository.update(categoryUpdateDto.id, {
      ...categoryUpdateDto,
    });
  }

  async delete(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }
}
