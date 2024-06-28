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
import {UsersService} from "../../users/services/users.service";
import {config} from 'dotenv';
import * as process from 'node:process';
import {CheckFileDto} from "@app/common/dto";

config();

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(ItemEntity) private readonly itemRepository: Repository<ItemEntity>,
        private readonly citiesService: CitiesService,
        private readonly categoryService: CategoryService,
        private readonly subCategoryService: SubCategoryService,
        private readonly usersService: UsersService,
    ) {
    }

    async create(file: any, itemDto: ItemDto): Promise<ItemEntity> {
        //Определение подписки и количества возможных объявлений по подписке
        try {

            //function getRandomInt(max: number) {
            //   return Math.floor(Math.random() * max).toString();
            //}

            const currentUser = await this.usersService.getByChatId(itemDto.owner.toString());
            const ownerItems = await this.itemRepository.find({where: {owner: currentUser.chatId}})
            //if (currentUser.subscribe) {
            //const userItems = await this.itemRepository.find({where: {owner: itemDto.owner.toString()}});
            //if (currentUser.subscribe.itemsNumber < userItems.length) {
            if (currentUser && !currentUser.banned) {
                if (ownerItems.length < +process.env.ITEMSMAX) {
                    const city = await this.citiesService.getById(itemDto.cityId);
                    const category = await this.categoryService.getById(itemDto.categoryId);
                    const subCategory = await this.subCategoryService.getById(itemDto.subCategoryId);
                    const fileName: string = `${itemDto.owner}_` + `${itemDto.title}_` + `${file[0].originalname}`;
                    const filePath = path.resolve() + `/itemsMainImages/${itemDto.owner}`;
                    const existingItem = await this.itemRepository.findOne({where: {image: filePath + '/' + fileName/*path.join(path.resolve(fileName))*/}});
                    if (!existingItem) {
                        if (!fs.existsSync(filePath)) {
                            fs.mkdir(filePath, {recursive: true}, (err) => {
                                if (err) console.log('Не вышло создать папку')
                            })
                            setTimeout(() => {
                                fs.writeFile(filePath + '/' + fileName, file[0].buffer, (err) => {// записываем файлы на сервер
                                    if (err) console.log('Не удалось создать файл')
                                })
                            }, 300)


                        } else {
                            fs.writeFile(filePath + '/' + fileName, file[0].buffer, (err) => {// записываем файлы на сервер
                                if (err) console.log('Не удалось создать файл')
                            })

                        }
                        if (itemDto.forBuying) {
                            const item: ItemEntity = this.itemRepository.create({
                                ...itemDto,
                                image: filePath + '/' + fileName,
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
                            const item: ItemEntity = this.itemRepository.create({
                                ...itemDto,
                                image: filePath + '/' + fileName,
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
                }
            }


        } catch (error) {

        }
    };

    async update(itemUpdateDto: ItemUpdateDto, file?: any): Promise<void> {
        try {
            const currentItem = await this.getById(itemUpdateDto.id);
            const currentUser = await this.usersService.getByChatId(currentItem.owner.toString())
            if (currentUser && currentUser.banned) {
                if (file) {
                    const fileName: string = `${itemUpdateDto.owner}_` + `${itemUpdateDto.title}_` + `${file[0].originalname}`;
                    const filePath = path.resolve() + `/itemsMainImages/${currentItem.owner}`
                    fs.unlink(currentItem.image, (error: any) => {
                        if (error) throw error;
                    })

                    fs.writeFile(filePath + '/' + fileName, file[0].buffer, (err) => {// записываем файлы на сервер
                        if (err) console.log('Не удалось создать файл')
                    })

                    await this.itemRepository.update(itemUpdateDto.id, {
                        ...itemUpdateDto,
                        image: filePath + '/' + fileName
                    });
                } else {
                    await this.itemRepository.update(itemUpdateDto.id, {...itemUpdateDto});
                }
            }
        } catch (error) {
        }

    }

    async getAll(chatId: string): Promise<ItemEntity[]> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId);
            if (currentUser && currentUser.banned) {
                const items: ItemEntity[] = await this.itemRepository.find({
                    where: {sold: false},
                    order: {createdAt: "DESC"}
                });
                return items;
            }
        } catch (error) {
        }

    };

    async getById(id: number): Promise<ItemEntity> {
        try {
            const item: ItemEntity = await this.itemRepository.findOne({
                where: {id: id},
                relations: ['category', 'city', 'subCategory']
            });
            return item
        } catch (error) {
        }

    };

    async getByOwner(owner: string): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {owner: owner, sold: false},
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    };

    async getSoldItemsByOwner(owner: string): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {owner: owner, sold: true},
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    }

    async getByCategoryId(categoryId: number): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {category: {id: categoryId}, sold: false},
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    }

    async getBySubCategoryId(subCategoryId: number): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {
                    subCategory: {id: subCategoryId},
                    sold: false
                },
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }
    }

    async getByCart(cartId: number): Promise<ItemEntity[]> {
        //const items: ItemEntity[] = await this.itemRepository.find({where: {carts: {id: cartId}}});
        return //items;
    };

    async getNotSold(): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {sold: false},
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }
    };

    async getOnlyForBuying(): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {forBuying: true, sold: false},
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }
    };

    async getOnlyForSale(): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {forSale: true, sold: false},
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    };

    async getAllBuyingByCityId(cityId: number): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {
                    city: {id: cityId},
                    forBuying: true,
                    sold: false
                },
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    };

    async getAllSaleByCityId(cityId: number): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {
                    city: {id: cityId},
                    forSale: true,
                    sold: false
                },
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    };

    async getAllBuyingByPrices(startPrice: number, finishPrice: number): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {
                    price: Between(startPrice, finishPrice),
                    forBuying: true
                },
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    };

    async getAllSaleByPrices(startPrice: number, finishPrice: number): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {
                    price: Between(startPrice, finishPrice),
                    forSale: true
                }
            });
            return items;
        } catch (error) {
        }

    }

    async getAllBuyingByTitle(title: string): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {
                    title: Like(`${title}%`),
                    forBuying: true,
                    sold: false
                },
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    };

    async getAllSaleByTitle(title: string): Promise<ItemEntity[]> {
        try {
            const items: ItemEntity[] = await this.itemRepository.find({
                where: {
                    title: Like(`${title}%`),
                    forSale: true,
                    sold: false
                },
                order: {createdAt: "DESC"}
            });
            return items;
        } catch (error) {
        }

    };


    async getExistingFileName(data: CheckFileDto): Promise<boolean> {
        try {
            const filePath = path.resolve() + `/itemsMainImages/${data.owner.toString()}`;
            const fileName: string = `${data.owner}_` + `${data.title}_` + `${data.file}`;
            const existingFile = await this.itemRepository.findOne({where: {image: filePath + '/' + fileName}})
            return !!existingFile;
        } catch (error) {

        }
    }

    async delete(id: number): Promise<void> {
        try {
            const item: ItemEntity = await this.itemRepository.findOne({where: {id: id}});
            fs.unlink(item.image, (error: any) => {
                if (error) throw error;
            })
            await this.itemRepository.delete(id);
        } catch (error) {
        }
    };

    //методы для задач CRON
    async getAllForCron(): Promise<ItemEntity[]> {
        try {

            const items: ItemEntity[] = await this.itemRepository.find({
                where: {sold: false},
                order: {createdAt: "DESC"}
            });
            return items;

        } catch (error) {
        }

    };

    async makeItemSold(id: number): Promise<void> {
        await this.itemRepository.update(id, {sold: true});
    }

}