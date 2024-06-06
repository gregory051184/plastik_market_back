import { Injectable, OnModuleInit } from '@nestjs/common';
import { itemsAdminMenuKeyboard } from '@app/common';
import { SubCategoryService } from '../subCategory.service';

@Injectable()
export class SubCategoriesFormsService implements OnModuleInit {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  async delete(bot: any, chatId: any, id: number): Promise<void> {
    await this.subCategoryService.delete(id).then(async () => {
      await bot.sendMessage(
        chatId,
        'Подкатегория удалёна',
        itemsAdminMenuKeyboard,
      );
    });
  }

  async onModuleInit(): Promise<void> {}
}
