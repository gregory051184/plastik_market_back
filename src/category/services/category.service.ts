import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {CategoryDto, CategoryEntity} from "@app/common";
import {Repository} from "typeorm";
import {CategoryUpdateDto} from "@app/common/dto";
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoriesRepository: Repository<CategoryEntity>,
        private readonly usersService: UsersService,
    ) {
    }

    async create(categoryDto: CategoryDto): Promise<CategoryEntity> {
        try {
            const existingCategory = await this.getByTitle(categoryDto.title);
            if (!existingCategory) {
                const currentUser = await this.usersService.getById(+categoryDto.userId);
                if (currentUser.admin) {
                    const category: CategoryEntity = await this.categoriesRepository.create(categoryDto);
                    await this.categoriesRepository.save(category);
                    return category;
                }
            }
        } catch (error) {
        }

    };

    async getAll(): Promise<CategoryEntity[]> {
        try {

            const categories: CategoryEntity[] = await this.categoriesRepository.find();
            return categories;

        } catch (error) {
        }

    };

    async getByTitle(title: string): Promise<CategoryEntity> {
        try {
            const category: CategoryEntity = await this.categoriesRepository.findOne({where: {title: title}});
            return category;
        } catch (error) {
        }
    }

    async getById(id: number): Promise<CategoryEntity> {
        try {
            const category: CategoryEntity = await this.categoriesRepository.findOne({where: {id: id}});
            return category;
        } catch (error) {
        }
    }

    async update(categoryUpdateDto: CategoryUpdateDto, chatId: string): Promise<void> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId.toString());
            if (currentUser.admin) {
                await this.categoriesRepository.update(categoryUpdateDto.id, {...categoryUpdateDto});
            }
        } catch (error) {
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.categoriesRepository.delete(id);
        } catch (error) {
        }
    }

}