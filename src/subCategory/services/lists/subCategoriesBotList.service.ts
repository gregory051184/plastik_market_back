import { Injectable, OnModuleInit } from '@nestjs/common';
import { SubCategoryService } from '../subCategory.service';
import { SubCategoryEntity, urls } from '@app/common';

@Injectable()
export class SubCategoriesBotListService implements OnModuleInit {
  constructor(private readonly subCategoriesService: SubCategoryService) {}

  async getAllSubCategoriesList(
    bot: any,
    chatId: string,
    forSale: boolean,
  ): Promise<void> {
    try {
      const subCategories: any = await this.subCategoriesService.getAll();

      if (subCategories.length > 0) {
        if (!forSale) {
          const cats = await subCategories.map((subCategory: any) => [
            {
              text: `${subCategory.title}`,
              callback_data: `subCategory_for_buying_${subCategory.id}`,
            },
          ]);
          await bot.sendMessage(chatId, 'Выберите подкатегорию для покупки', {
            reply_markup: JSON.stringify({
              inline_keyboard: cats,
            }),
          });
        }
        if (forSale) {
          const cats = await subCategories.map((subCategory: any) => [
            {
              text: `${subCategory.title}`,
              callback_data: `subCategory_for_sale_${subCategory.id}`,
            },
          ]);
          await bot.sendMessage(chatId, 'Выберите подкатегорию для продажи', {
            reply_markup: JSON.stringify({
              inline_keyboard: cats,
            }),
          });
        }
      } else {
        await bot.sendMessage(chatId, 'Подкатегорий пока нет');
      }
    } catch (error) {}
  }

  async onModuleInit(): Promise<void> {}

  async getSubCategoriesByCategoryId(
    bot: any,
    chatId: string,
    categoryId: number,
    forSale: boolean,
  ): Promise<void> {
    try {
      const subCategories: SubCategoryEntity[] =
        await this.subCategoriesService.getByCategory(categoryId);

      if (subCategories.length > 0) {
        if (!forSale) {
          const cats = await subCategories.map((subCategory: any) => [
            {
              text: `${subCategory.title}`,
              callback_data: `subCategory_for_buying_${subCategory.id}`,
            },
          ]);
          await bot.sendMessage(chatId, 'Выберите подкатегорию для покупки', {
            reply_markup: JSON.stringify({
              inline_keyboard: cats,
            }),
          });
        }
        if (forSale) {
          const cats = await subCategories.map((subCategory: any) => [
            {
              text: `${subCategory.title}`,
              callback_data: `subCategory_for_sale_${subCategory.id}`,
            },
          ]);
          await bot.sendMessage(chatId, 'Выберите подкатегорию для продажи', {
            reply_markup: JSON.stringify({
              inline_keyboard: cats,
            }),
          });
        }
      } else {
        await bot.sendMessage(chatId, 'Подкатегорий пока нет');
      }
    } catch (error) {}
  }

  async getAllSubCategoriesForUpdateList(
    bot: any,
    chatId: string,
  ): Promise<void> {
    try {
      const subCategories: SubCategoryEntity[] =
        await this.subCategoriesService.getAll();

      const subCat = await subCategories.map((subCategory: any) => [
        {
          text: `${subCategory.title}`,
          web_app: {
            url: `${urls.update_subcategory_form}/` + `${subCategory.id}`,
          },
        },
      ]);

      if (subCategories.length > 0) {
        await bot.sendMessage(chatId, 'Выберите подкатегорию для изменения', {
          reply_markup: JSON.stringify({
            inline_keyboard: subCat,
          }),
        });
      } else {
        await bot.sendMessage(chatId, 'Подкатегорий пока нет');
      }
    } catch (error) {}
  }

  async getAllSubCategoryForDeleteList(
    bot: any,
    chatId: string,
  ): Promise<void> {
    try {
      const subCategories: SubCategoryEntity[] =
        await this.subCategoriesService.getAll();

      const subCats = await subCategories.map((subCategory: any) => [
        {
          text: `${subCategory.title}`,
          callback_data: `delete_this_subCategory_${subCategory.id}`,
        },
      ]);

      if (subCategories.length > 0) {
        await bot.sendMessage(chatId, 'Выберите подкатегорию для удаления', {
          reply_markup: JSON.stringify({
            inline_keyboard: subCats,
          }),
        });
      } else {
        await bot.sendMessage(chatId, 'Подкатегорий пока нет');
      }
    } catch (error) {}
  }

  async deleteSubCategory(
    bot: any,
    chatId: string,
    subCategoryId: number,
  ): Promise<void> {
    try {
      await this.subCategoriesService.delete(subCategoryId);
      await bot.sendMessage(chatId, 'Подкатегория удалена');
    } catch (error) {}
  }
}
