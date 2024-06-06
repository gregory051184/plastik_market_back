import { Injectable, OnModuleInit } from '@nestjs/common';
import { CategoryService } from '../category.service';
import { CategoryEntity, urls } from '@app/common';

@Injectable()
export class CategoriesBotListsService implements OnModuleInit {
  constructor(private readonly categoriesService: CategoryService) {}

  async getAllCategoriesList(
    bot: any,
    chatId: string,
    forSale: boolean,
  ): Promise<void> {
    try {
      const categories: any = await this.categoriesService.getAll();

      if (categories.length > 0) {
        if (!forSale) {
          const cats = await categories.map((category: any) => [
            {
              text: `${category.title}`,
              callback_data: `category_for_buying_${category.id}`,
            },
          ]);
          await bot.sendMessage(chatId, 'Выберите категорию для покупки', {
            reply_markup: JSON.stringify({
              inline_keyboard: cats,
            }),
          });
        }
        if (forSale) {
          const cats = await categories.map((category: any) => [
            {
              text: `${category.title}`,
              callback_data: `category_for_sale_${category.id}`,
            },
          ]);
          await bot.sendMessage(chatId, 'Выберите категорию для продажи', {
            reply_markup: JSON.stringify({
              inline_keyboard: cats,
            }),
          });
        }
      } else {
        await bot.sendMessage(chatId, 'Категорий пока нет');
      }
    } catch (error) {}
  }

  async getAllCategoriesForUpdateList(bot: any, chatId: string): Promise<void> {
    try {
      const categories: CategoryEntity[] =
        await this.categoriesService.getAll();

      const cat = await categories.map((category: any) => [
        {
          text: `${category.title}`,
          web_app: { url: `${urls.update_category_form}/` + `${category.id}` },
        },
      ]);

      if (categories.length > 0) {
        await bot.sendMessage(chatId, 'Выберите категорию для изменения', {
          reply_markup: JSON.stringify({
            inline_keyboard: cat,
          }),
        });
      } else {
        await bot.sendMessage(chatId, 'Категорий пока нет');
      }
    } catch (error) {}
  }

  async getAllCategoryForDeleteList(bot: any, chatId: string): Promise<void> {
    try {
      const categories: CategoryEntity[] =
        await this.categoriesService.getAll();

      const cats = await categories.map((category: any) => [
        {
          text: `${category.title}`,
          callback_data: `delete_this_category_${category.id}`,
        },
      ]);

      if (categories.length > 0) {
        await bot.sendMessage(chatId, 'Выберите категорию для удаления', {
          reply_markup: JSON.stringify({
            inline_keyboard: cats,
          }),
        });
      } else {
        await bot.sendMessage(chatId, 'Категорий пока нет');
      }
    } catch (error) {}
  }

  async deleteCategory(
    bot: any,
    chatId: string,
    categoryId: number,
  ): Promise<void> {
    try {
      await this.categoriesService.delete(categoryId);
      await bot.sendMessage(chatId, 'Категория удалена');
    } catch (error) {}
  }

  async onModuleInit(): Promise<void> {}
}
