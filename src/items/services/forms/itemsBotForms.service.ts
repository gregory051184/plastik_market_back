import { Injectable, OnModuleInit } from '@nestjs/common';
import { ItemService } from '../item.service';


@Injectable()
export class ItemsBotFormsService implements OnModuleInit {
  constructor(private readonly itemService: ItemService) {}

  async deleteItemItem(bot: any, chatId: any, id: number): Promise<void> {
    await this.itemService.delete(id).then(async () => {
      await bot.sendMessage(chatId, 'Товар удалён');
    });
  }

  async markItemAsSoldForm(
    bot: any,
    chatId: string,
    itemId: number,
  ): Promise<void> {
    try {
      await this.itemService.update({ id: itemId, sold: true }); //ItemModel.update({sold: true}, {where: {id: itemId}})
      await bot.sendMessage(chatId, `Товар помечен как проданный/купленный`);
    } catch (error) {}
  }

  async markItemAsNotSoldForm(
    bot: any,
    chatId: string,
    itemId: number,
  ): Promise<void> {
    try {
      await this.itemService.update({ id: itemId, sold: false }); //ItemModel.update({sold: true}, {where: {id: itemId}})
      await bot.sendMessage(chatId, `Объявление снова активировано`);
    } catch (error) {}
  }

  async onModuleInit(): Promise<void> {}
}
