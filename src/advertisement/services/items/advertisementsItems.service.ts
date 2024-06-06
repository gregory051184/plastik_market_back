import { Injectable, OnModuleInit } from '@nestjs/common';
import { AdvertisementService } from '../advertisement.service';
import { itemsUserMenuKeyboard } from '@app/common';
import { ItemService } from '../../../items/services/item.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdvertisementsItemsService implements OnModuleInit {
  constructor(
    private readonly advertisementService: AdvertisementService,
    private readonly itemService: ItemService,
    private readonly configService: ConfigService,
  ) {}

  async advertisementPayPageItem(
    bot: any,
    chatId: string,
    advertisementId: number,
    itemId: number,
  ): Promise<void> {
    try {
      const advertisement: any = await this.advertisementService.findById(
        advertisementId,
      );

      const item: any = await this.itemService.update({
        id: itemId,
        advertisementId: advertisement.id,
      });
      await bot.sendInvoice(
        chatId,
        advertisement.title,
        advertisement.description,
        'payload',
        this.configService.get('PAY_TOKEN'),
        'RUB',
        [
          {
            label: `Цена ${advertisement.title}`,
            amount: advertisement.price * 100,
          },
        ],
        {
          need_name: true,
          need_phone_number: true,
          need_email: true,
        },
      );
      return bot.sendMessage(
        chatId,
        `*****МЕНЮ ТОВАРОВ*****`,
        itemsUserMenuKeyboard,
      );
    } catch (error) {
      return bot.sendMessage(
        chatId,
        `Возникла непредвиденная ошибка`,
        itemsUserMenuKeyboard,
      );
    }
  }

  async getAdvertisementByIdItem(
    bot: any,
    chatId: string,
    advertisementId: number,
    itemId: number,
  ): Promise<void> {
    try {
      const advertisement: any = await this.advertisementService.findById(
        advertisementId,
      );
      if (advertisement.id) {
        await bot.sendMessage(
          chatId,
          `
             Наименование рекламы - ${advertisement.title}
             Цена - ${advertisement.price}
             Описание - ${advertisement.description}
             Срок - 30 дней
            `,
          {
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: 'Купить рекламу',
                    callback_data: `buy_advertisement_${advertisement.id}_${itemId}`,
                  },
                ],
              ],
            }),
          },
        );
      }
    } catch (error) {}
  }

  async onModuleInit(): Promise<void> {}
}
