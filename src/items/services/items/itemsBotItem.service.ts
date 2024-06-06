import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from '../../../users/services/users.service';
import {
  adminButtons,
  adminCallback,
  itemsAdminMenuKeyboard,
  itemsUserMenuKeyboard,
  urls,
  userButtons,
} from '@app/common';
import { CartService } from '../../../cart/services/cart.service';
import { ItemService } from '../item.service';

@Injectable()
export class ItemsBotItemService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly cartService: CartService,
    private readonly itemService: ItemService,
  ) {}

  async getItemByIdItem(bot: any, chatId: string, id: number): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const item: any = await this.itemService.getById(id);

      if (item.id) {
        if (currentUser.admin) {
          await bot.sendPhoto(chatId, item.image, {
            caption: `
                Наименование - ${item.title}
            ${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${
              item.price
            } ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
            ${item.forSale && item.sold ? 'ТОВАР ПРОДАН' : ''}
            Описание - ${item.description}
                        `,
            parse_mode: 'markdown',

            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: `Удалить`,
                    callback_data: `${adminCallback.items.delete}_${item.id}`,
                  },
                  {
                    text: item.forSale ? 'Купить' : ' Получить контакт',
                    callback_data: `buy_item_${item.id}`,
                  },
                ],
                [
                  {
                    text:
                      item.owner !== chatId.toString()
                        ? 'Усилить объявление'
                        : '',
                    callback_data: `to_advertisements_list_${item.id}`,
                  },
                ],
                [
                  {
                    text: item.forSale ? 'Пометить как проданный' : '',
                    callback_data: `mark_item_as_sold_${item.id}`,
                  },
                ],
                [
                  {
                    text:
                      !cart.items.find((it: any) => it.id === item.id) &&
                      item.owner !== chatId.toString()
                        ? adminButtons.carts.addToFavorites
                        : '',
                    callback_data: `${adminCallback.carts.addToFavorites}_${item.id}`,
                  },
                ],
              ],
            }),
          });
        }

        if (!currentUser.admin && currentUser.chatId !== item.owner) {
          await bot.sendPhoto(chatId, item.image, {
            caption: `
                Наименование - ${item.title}
            ${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${
              item.price
            }  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
            ${item.forSale && item.sold ? 'ТОВАР ПРОДАН' : ''}
            Описание - ${item.description}
                        `,
            parse_mode: 'markdown',

            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: item.forSale ? 'Купить' : ' Получить контакт',
                    callback_data: `buy_item_${item.id}`,
                  },
                ],
                [
                  {
                    text:
                      !cart.items.find((it: any) => it.id === item.id) &&
                      item.owner !== chatId.toString()
                        ? adminButtons.carts.addToFavorites
                        : '',
                    callback_data: `${adminCallback.carts.addToFavorites}_${item.id}`,
                  },
                ],
              ],
            }),
          });
        }

        if (!currentUser.admin && currentUser.chatId === item.owner) {
          await bot.sendPhoto(chatId, item.image, {
            caption: `
                Наименование - ${item.title}
            ${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${
              item.price
            } ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
            ${item.forSale && item.sold ? 'ТОВАР ПРОДАН' : ''}
            Описание - ${item.description}
                        `,
            parse_mode: 'markdown',

            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: item.forSale
                      ? 'Пометить как проданный'
                      : 'Пометить как купленный',
                    callback_data: `mark_item_as_sold_${item.id}`,
                  },
                ],
                [
                  {
                    text: 'Посмотреть рекламные предложения',
                    callback_data: `to_advertisements_list_${item.id}`,
                  },
                ],
                [
                  {
                    text: userButtons.items.updateItem,
                    web_app: {
                      url:
                        `${urls.update_item_form}/` +
                        `${item.id}/` +
                        `${chatId}`,
                    },
                  },
                ],

                [
                  {
                    text: `Удалить`,
                    callback_data: `${adminCallback.items.delete}_${item.id}`,
                  },
                ],
              ],
            }),
          });
        }
      } else {
        if (!currentUser.admin) {
          await bot.sendMessage(
            chatId,
            `Возникла непредвиденная ошибка`,
            itemsUserMenuKeyboard,
          );
        }
        if (currentUser.admin) {
          await bot.sendMessage(
            chatId,
            `Возникла непредвиденная ошибка`,
            itemsAdminMenuKeyboard,
          );
        }
      }
    } catch (error) {}
  }

  async onModuleInit(): Promise<void> {}
}
