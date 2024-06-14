import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ItemDto, ItemEntity} from "@app/common";
import {Between, Like, Repository} from "typeorm";
import {ItemUpdateDto} from "@app/common/dto/item/itemUpdate.dto";
import * as path from "path";
import * as fs from "fs";
import {CitiesService} from "../../city/services/cities.service";
import {CategoryService} from "../../category/services/category.service";
import {SubCategoryService} from "../../subCategory/services/subCategory.service";


@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemEntity) private readonly itemRepository: Repository<ItemEntity>,
        private readonly citiesService: CitiesService,
        private readonly categoryService: CategoryService,
        private readonly subCategoryService: SubCategoryService,
    ) {
    }

    async create(file: any, itemDto: ItemDto): Promise<ItemEntity> {
        const city = await this.citiesService.getById(itemDto.cityId);
        const category = await this.categoryService.getById(itemDto.categoryId);
        const subCategory = await this.subCategoryService.getById(itemDto.subCategoryId);
        const fileName: string = `${itemDto.owner}_` + `${itemDto.title}_` + `${file[0].originalname}`;
        const existingItem = await this.itemRepository.findOne({where: {image: path.join(path.resolve(fileName))}})
        const filePath = path.resolve() + `/itemsMainImages/${itemDto.owner}`
        if (!existingItem) {
            if (!fs.existsSync(filePath)) {
                fs.mkdir(filePath, {recursive: true}, (err) => {
                    if (err) console.log('Не вышло создать папку')
                })
                fs.writeFile(filePath + '/' + fileName, file[0].buffer, (err) => {// записываем файлы на сервер
                    if (err) console.log('Не удалось создать файл')
                })
                //fs.writeFile(path.join(path.resolve(fileName)), file[0].buffer, (err) => {// записываем файлы на сервер
                //    if (err) console.log('Не удалось создать файл')
                //})
            } else {
                fs.writeFile(filePath + '/' + fileName, file[0].buffer, (err) => {// записываем файлы на сервер
                    if (err) console.log('Не удалось создать файл')
                })
                //Это нужно будет убрать а сверху раскомментировать
                //fs.writeFile(path.join(path.resolve(fileName)), file[0].buffer, (err) => {// записываем файлы на сервер
                    //if (err) console.log('Не удалось создать файл')
                //})
            }
            //const item: ItemEntity = await this.itemRepository.create({...itemDto, image: path.join(filePath, fileName)});
            if (itemDto.forBuying) {
                const item: ItemEntity = await this.itemRepository.create({
                    ...itemDto,
                    image: filePath + '/' + fileName,
                    //image: path.join(path.resolve(fileName)),
                    sold: false,
                    forBuying: true,
                    forSale: false
                });
                item.category = category;
                item.subCategory = subCategory;
                item.city = city;
                await this.itemRepository.save(item);
                return item
            } else {
                const item: ItemEntity = await this.itemRepository.create({
                    ...itemDto,
                    image: filePath + '/' + fileName,
                    //image: path.join(path.resolve(fileName)),
                    sold: false,
                    forBuying: false,
                    forSale: true
                });
                item.category = category;
                item.subCategory = subCategory;
                item.city = city;
                await this.itemRepository.save(item);
                return item
            }

        }
    };

    async update(itemUpdateDto: ItemUpdateDto, file?: any): Promise<void> {
        if (file) {
            const currentItem = await this.getById(itemUpdateDto.id);
            const fileName: string = `${itemUpdateDto.owner}_` + `${itemUpdateDto.title}_` + `${file[0].originalname}`;
            //const filePath = path.resolve(__dirname, '..', '..', `itemsMainImages`, `${itemUpdateDto.owner}`);
            fs.unlink(currentItem.image, (error: any) => {
                if (error) throw error;
            })

            fs.writeFile(path.join(path.resolve(fileName)), file[0].buffer, (err) => {// записываем файлы на сервер
                if (err) console.log('Не удалось создать файл')
            })

            await this.itemRepository.update(itemUpdateDto.id, {...itemUpdateDto, image: path.resolve(fileName)});
        } else {
            await this.itemRepository.update(itemUpdateDto.id, {...itemUpdateDto});
        }
    }

    async getAll(): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({where: {sold: false}, order: {createdAt: "DESC"}});
        return items;
    };

    async getById(id: number): Promise<ItemEntity> {
        const item: ItemEntity = await this.itemRepository.findOne({
            where: {id: id},
            relations: ['category', 'city', 'subCategory']
        });
        return item
    };

    async getByOwner(owner: string): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {owner: owner, sold: false},
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async getSoldItemsByOwner(owner: string): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {owner: owner, sold: true},
            order: {createdAt: "DESC"}
        });
        return items;
    }

    async getByCategoryId(categoryId: number): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {category: {id: categoryId}, sold: false},
            order: {createdAt: "DESC"}
        });
        return items;
    }

    async getBySubCategoryId(subCategoryId: number): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {
                subCategory: {id: subCategoryId},
                sold: false
            },
            order: {createdAt: "DESC"}
        });
        return items;
    }

    async getByCart(cartId: number): Promise<ItemEntity[]> {
        //const items: ItemEntity[] = await this.itemRepository.find({where: {carts: {id: cartId}}});
        return //items;
    };

    async getNotSold(): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({where: {sold: false}, order: {createdAt: "DESC"}});
        return items;
    };

    async getOnlyForBuying(): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {forBuying: true, sold: false},
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async getOnlyForSale(): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {forSale: true, sold: false},
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async getAllBuyingByCityId(cityId: number): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {
                city: {id: cityId},
                forBuying: true,
                sold: false
            },
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async getAllSaleByCityId(cityId: number): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {
                city: {id: cityId},
                forSale: true,
                sold: false
            },
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async getAllBuyingByPrices(startPrice: number, finishPrice: number): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {
                price: Between(startPrice, finishPrice),
                forBuying: true
            },
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async getAllSaleByPrices(startPrice: number, finishPrice: number): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {
                price: Between(startPrice, finishPrice),
                forSale: true
            }
        });
        return items;
    }

    async getAllBuyingByTitle(title: string): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {
                title: Like(`${title}%`),
                forBuying: true,
                sold: false
            },
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async getAllSaleByTitle(title: string): Promise<ItemEntity[]> {
        const items: ItemEntity[] = await this.itemRepository.find({
            where: {
                title: Like(`${title}%`),
                forSale: true,
                sold: false
            },
            order: {createdAt: "DESC"}
        });
        return items;
    };

    async delete(id: number): Promise<void> {
        const item: ItemEntity = await this.itemRepository.findOne({where: {id: id}});
        fs.unlink(item.image, (error: any) => {
            if (error) throw error;
        })
        await this.itemRepository.delete(id);
    };
}