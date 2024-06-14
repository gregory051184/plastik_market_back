import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SubCategoryEntity} from "@app/common";
import {Repository} from "typeorm";
import {SubCategoryDto, SubCategoryUpdateDto} from "@app/common/dto";
import {CategoryService} from "../../category/services/category.service";

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategoryEntity) private readonly subCategoriesRepository: Repository<SubCategoryEntity>,
        private readonly categoryService: CategoryService,
    ) {
    }

    async create(subCategoryDto: SubCategoryDto): Promise<SubCategoryEntity> {
        const category = await this.categoryService.getById(subCategoryDto.categoryId);
        const subCategory: SubCategoryEntity = await this.subCategoriesRepository.create(subCategoryDto);
        subCategory.category = category;
        await this.subCategoriesRepository.save(subCategory);
        return subCategory
    };

    async getAll(): Promise<SubCategoryEntity[]> {
        const categories: SubCategoryEntity[] = await this.subCategoriesRepository.find();
        return categories;
    };

    async getById(id: number): Promise<SubCategoryEntity> {
        const category: SubCategoryEntity = await this.subCategoriesRepository.findOne({where: {id: id}});
        return category;
    }

    async update(subCategoryUpdateDto: SubCategoryUpdateDto): Promise<void> {
        await this.subCategoriesRepository.update(subCategoryUpdateDto.id, {...subCategoryUpdateDto});
    };

    async getByCategory(categoryId: number): Promise<SubCategoryEntity[]> {
        const subCategories: SubCategoryEntity[] = await this.subCategoriesRepository.find({
            where:
                {category: {id: categoryId}}
        });
        return subCategories
    }

    async delete(id: number): Promise<void> {
        await this.subCategoriesRepository.delete(id);
    }

}