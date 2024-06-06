import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class FilterService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async itemFilter(data: any, forSale: boolean): Promise<ItemEntity[]> {
    if (data.city) {
      return forSale
        ? this.itemRepository.find({
            where: { city: { id: data.city }, forSale: true },
          })
        : this.itemRepository.find({
            where: { city: { id: data.city }, forBuying: true },
          });
    }
    if (data.category) {
      return forSale
        ? this.itemRepository.find({
            where: { category: { id: data.category }, forSale: true },
          })
        : this.itemRepository.find({
            where: { category: { id: data.category }, forBuying: true },
          });
    }

    if (data.title) {
      return forSale
        ? this.itemRepository.find({
            where: { title: data.title, forSale: true },
          })
        : this.itemRepository.find({
            where: { title: data.title, forBuying: true },
          });
    }

    if (data.subCategory) {
      return forSale
        ? this.itemRepository.find({
            where: { subCategory: { id: data.subCategory }, forSale: true },
          })
        : this.itemRepository.find({
            where: { subCategory: { id: data.subCategory }, forBuying: true },
          });
    }

    if (data.title && data.city) {
      return forSale
        ? this.itemRepository.find({
            where: {
              title: data.title,
              city: { id: data.city },
              forSale: true,
            },
          })
        : this.itemRepository.find({
            where: {
              title: data.title,
              city: { id: data.city },
              forBuying: true,
            },
          });
    }

    if (data.title && data.category) {
      return forSale
        ? this.itemRepository.find({
            where: {
              title: data.title,
              category: { id: data.category },
              forSale: true,
            },
          })
        : this.itemRepository.find({
            where: {
              title: data.title,
              category: { id: data.category },
              forBuying: true,
            },
          });
    }

    if (data.title && data.subCategory) {
      return forSale
        ? this.itemRepository.find({
            where: {
              title: data.title,
              subCategory: { id: data.subCategory },
              forSale: true,
            },
          })
        : this.itemRepository.find({
            where: {
              title: data.title,
              subCategory: { id: data.subCategory },
              forBuying: true,
            },
          });
    }

    if (data.city && data.subCategory) {
      return forSale
        ? this.itemRepository.find({
            where: {
              city: { id: data.city },
              subCategory: { id: data.subCategory },
              forSale: true,
            },
          })
        : this.itemRepository.find({
            where: {
              city: { id: data.city },
              subCategory: { id: data.subCategory },
              forBuying: true,
            },
          });
    }

    if (data.city && data.category) {
      return forSale
        ? this.itemRepository.find({
            where: {
              city: { id: data.city },
              category: { id: data.category },
              forSale: true,
            },
          })
        : this.itemRepository.find({
            where: {
              city: { id: data.city },
              category: { id: data.category },
              forBuying: true,
            },
          });
    }

    if (data.title && data.city && data.subCategory) {
      return forSale
        ? this.itemRepository.find({
            where: {
              title: data.title,
              city: { id: data.city },
              subCategory: { id: data.subCategory },
              forSale: true,
            },
          })
        : this.itemRepository.find({
            where: {
              title: data.title,
              city: { id: data.city },
              subCategory: { id: data.subCategory },
              forBuying: true,
            },
          });
    }

    if (data.title && data.city && data.category) {
      return forSale
        ? this.itemRepository.find({
            where: {
              title: data.title,
              city: { id: data.city },
              category: { id: data.category },
              forSale: true,
            },
          })
        : this.itemRepository.find({
            where: {
              title: data.title,
              city: { id: data.city },
              category: { id: data.category },
              forBuying: true,
            },
          });
    }
    return;
  }
}
