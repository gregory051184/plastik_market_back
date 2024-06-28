import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SubCategoryEntity} from "@app/common";
import {Repository} from "typeorm";
import {SubCategoryDto, SubCategoryUpdateDto} from "@app/common/dto";
import {CategoryService} from "../../category/services/category.service";
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategoryEntity) private readonly subCategoriesRepository: Repository<SubCategoryEntity>,
        private readonly categoryService: CategoryService,
        private readonly usersService: UsersService,
    ) {
    }

    async create(subCategoryDto: SubCategoryDto): Promise<SubCategoryEntity> {
        try {
            const existingSubCategory = await this.getByTitle(subCategoryDto.title);
            if (!existingSubCategory) {
                const currentUser = await this.usersService.getById(subCategoryDto.userId);
                if (currentUser.admin) {
                    const category = await this.categoryService.getById(subCategoryDto.categoryId);
                    const subCategory: SubCategoryEntity = await this.subCategoriesRepository.create(subCategoryDto);
                    subCategory.category = category;
                    await this.subCategoriesRepository.save(subCategory);
                    return subCategory
                }
            }
        } catch (error) {
        }
    };

    async getAll(): Promise<SubCategoryEntity[]> {
        try {

            const categories: SubCategoryEntity[] = await this.subCategoriesRepository.find();
            return categories;

        } catch (error) {
        }
    };

    async getById(id: number): Promise<SubCategoryEntity> {
        try {
            const category: SubCategoryEntity = await this.subCategoriesRepository.findOne({where: {id: id}});
            return category;
        } catch (error) {
        }
    };

    async getByTitle(title: string): Promise<SubCategoryEntity> {
        try {
            const category: SubCategoryEntity = await this.subCategoriesRepository.findOne({where: {title: title}});
            return category;
        } catch (error) {
        }
    };

    async update(subCategoryUpdateDto: SubCategoryUpdateDto, chatId: string): Promise<void> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId.toString());
            if (currentUser.admin) {
                const category = await this.categoryService.getById(subCategoryUpdateDto.categoryId);
                await this.subCategoriesRepository.update(subCategoryUpdateDto.id, {title: subCategoryUpdateDto.title, category: category});
            }
        } catch (error) {
        }

    };

    async getByCategory(categoryId: number): Promise<SubCategoryEntity[]> {
        try {
            const subCategories: SubCategoryEntity[] = await this.subCategoriesRepository.find({
                where:
                    {category: {id: categoryId}}
            });
            return subCategories
        } catch (error) {
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.subCategoriesRepository.delete(id);
        } catch (error) {
        }
    }

}