import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  subscribeAdminMenuKeyboard,
  subscribeUserMenuKeyboard,
  SubscriptionEntity,
  urls,
} from '@app/common';
import { SubscribeService } from '../subscribe.service';
import { UsersService } from '../../../users/services/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubscribesBotListService implements OnModuleInit {
  constructor(
    private readonly subscribesService: SubscribeService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async getAllSubscribesList(bot: any, chatId: string): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(
        chatId.toString(),
      );
      const subscribes: any = await this.subscribesService.getAll();

      if (subscribes.length > 0) {
        const cit = await subscribes.map((subscribe: any) => [
          {
            text: `${subscribe.title}`,
            callback_data: `subscribe_${subscribe.id}`,
          },
        ]);
        await bot.sendMessage(
          chatId,
          'Выберите подписку',

          {
            reply_markup: JSON.stringify({
              inline_keyboard: cit,
            }),
          },
        ); //.then(async () => {
        //await bot.sendMessage(chatId, `Город удалён`)
        //})
        if (currentUser.admin) {
          await bot.sendMessage(
            chatId,
            '*****МЕНЮ ПОДПИСОК АДМИН*****',
            subscribeAdminMenuKeyboard,
          );
        }
        if (!currentUser.admin) {
          await bot.sendMessage(
            chatId,
            '*****МЕНЮ ПОДПИСОК ПОЛЬЗОВАТЕЛЬ*****',
            subscribeUserMenuKeyboard,
          );
        }
      } else {
        await bot.sendMessage(chatId, 'Подписки пока не внесены');

        if (currentUser.admin) {
          await bot.sendMessage(
            chatId,
            '*****МЕНЮ ПОДПИСОК АДМИН*****',
            subscribeAdminMenuKeyboard,
          );
        }
        if (!currentUser.admin) {
          await bot.sendMessage(
            chatId,
            '*****МЕНЮ ПОДПИСОК ПОЛЬЗОВАТЕЛЬ*****',
            subscribeUserMenuKeyboard,
          );
        }
      }
    } catch (error) {}
  }

  async onModuleInit(): Promise<void> {}

  async getAllSubscribesForUpdateList(bot: any, chatId: string): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(
        chatId.toString(),
      );
      if (currentUser.admin) {
        const subscribes: SubscriptionEntity[] =
          await this.subscribesService.getAll();
        const sub = await subscribes.map((subscribe: any) => [
          {
            text: `${subscribe.title}`,
            web_app: {
              url: `${urls.update_subscribe_form}/` + `${subscribe.id}`,
            },
          },
        ]);
        if (subscribes.length > 0) {
          await bot.sendMessage(chatId, 'Выберите подписку для изменения', {
            reply_markup: JSON.stringify({
              inline_keyboard: sub,
            }),
          });
        } else {
          await bot.sendMessage(chatId, 'Подписок пока нет');
        }
      }
    } catch (error) {}
  }

  async getAllSubscribeForDeleteList(bot: any, chatId: string): Promise<void> {
    try {
      const subscribes: SubscriptionEntity[] =
        await this.subscribesService.getAll();

      const cit = await subscribes.map((subscribe: any) => [
        {
          text: `${subscribe.title}`,
          callback_data: `delete_this_subscribe_${subscribe.id}`,
        },
      ]);

      if (subscribes.length > 0) {
        await bot.sendMessage(chatId, 'Выберите подписку для удаления', {
          reply_markup: JSON.stringify({
            inline_keyboard: cit,
          }),
        });
      } else {
        await bot.sendMessage(chatId, 'Подписок пока нет');
      }
    } catch (error) {}
  }

  async deleteSubscribe(
    bot: any,
    chatId: string,
    subscribeId: number,
  ): Promise<void> {
    try {
      await this.subscribesService.delete(subscribeId);
      await bot.sendMessage(chatId, 'Подписка удалена');
    } catch (error) {}
  }
}
