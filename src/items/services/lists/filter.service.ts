import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ItemEntity} from "@app/common";
import {Between, Repository} from "typeorm";

@Injectable()
export class FilterService {
    constructor(
        @InjectRepository(ItemEntity) private readonly itemRepository: Repository<ItemEntity>
    ) {
    }

    async itemFilter(data: any, forSale: boolean): Promise<ItemEntity[]> {

        if (data.city) {
            return forSale ? this.itemRepository.find({
                    where: {city: {id: data.city}, forSale: true},
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({where: {city: {id: data.city}, forBuying: true}, order: {createdAt: "ASC"}});
        }
        if (data.category) {
            return forSale ? this.itemRepository.find({
                    where: {category: {id: data.category}, forSale: true},
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({
                    where: {category: {id: data.category}, forBuying: true},
                    order: {createdAt: "ASC"}
                });
        }

        if (data.title) {
            return forSale ? this.itemRepository.find({
                    where: {title: data.title, forSale: true},
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({where: {title: data.title, forBuying: true}, order: {createdAt: "ASC"}});
        }

        if (data.subCategory) {
            return forSale ?
                this.itemRepository.find({
                    where: {subCategory: {id: data.subCategory}, forSale: true},
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({
                    where: {subCategory: {id: data.subCategory}, forBuying: true},
                    order: {createdAt: "ASC"}
                });
        }

        if (data.title && data.city) {
            return forSale ?
                this.itemRepository.find({
                    where: {title: data.title, city: {id: data.city}, forSale: true},
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({
                    where: {title: data.title, city: {id: data.city}, forBuying: true},
                    order: {createdAt: "ASC"}
                });
        }

        if (data.title && data.category) {
            return forSale ?
                this.itemRepository.find({
                    where: {title: data.title, category: {id: data.category}, forSale: true},
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({
                    where: {title: data.title, category: {id: data.category}, forBuying: true},
                    order: {createdAt: "ASC"}
                });
        }

        if (data.title && data.subCategory) {
            return forSale ?
                this.itemRepository.find({
                    where: {
                        title: data.title,
                        subCategory: {id: data.subCategory},
                        forSale: true
                    },
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({
                    where: {
                        title: data.title,
                        subCategory: {id: data.subCategory},
                        forBuying: true
                    },
                    order: {createdAt: "ASC"}
                });
        }

        if (data.city && data.subCategory) {

            return forSale ?
                this.itemRepository.find({
                    where: {
                        city: {id: data.city},
                        subCategory: {id: data.subCategory},
                        forSale: true
                    },
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({
                    where: {
                        city: {id: data.city},
                        subCategory: {id: data.subCategory},
                        forBuying: true
                    },
                    order: {createdAt: "ASC"}
                });
        }


        if (data.city && data.category) {
            return forSale ? this.itemRepository.find({
                where: {
                    city: {id: data.city}, category: {id: data.category},
                    forSale: true
                },
                order: {createdAt: "ASC"}
            }) : this.itemRepository.find({
                where: {
                    city: {id: data.city}, category: {id: data.category},
                    forBuying: true
                },
                order: {createdAt: "ASC"}
            });
        }

        if (data.title && data.city && data.subCategory) {
            return forSale ? this.itemRepository.find({
                    where: {
                        title: data.title,
                        city: {id: data.city},
                        subCategory: {id: data.subCategory},
                        forSale: true
                    },
                    order: {createdAt: "ASC"}
                }) :
                this.itemRepository.find({
                    where: {
                        title: data.title,
                        city: {id: data.city},
                        subCategory: {id: data.subCategory},
                        forBuying: true
                    },
                    order: {createdAt: "ASC"}
                });
        }


        if (data.title && data.city && data.category) {
            return forSale ? this.itemRepository.find({
                where: {
                    title: data.title,
                    city: {id: data.city},
                    category: {id: data.category},
                    forSale: true
                },
                order: {createdAt: "ASC"}
            }) : this.itemRepository.find({
                where: {
                    title: data.title,
                    city: {id: data.city},
                    category: {id: data.category},
                    forBuying: true
                },
                order: {createdAt: "ASC"}
            });
        }
        return
    }
}