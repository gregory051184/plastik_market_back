import { Injectable, OnModuleInit } from '@nestjs/common';
import { CommonService } from '@app/common/services/common.service';
import { CitiesService } from '../cities.service';
import { UsersService } from '../../../users/services/users.service';
import {
  citiesAdminMenuKeyboard,
  citiesUserMenuKeyboard,
  CityEntity,
  urls,
} from '@app/common';

@Injectable()
export class CitiesBotListService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly citiesService: CitiesService,
    private readonly commonService: CommonService,
  ) {}

  async getAllCitiesList(
    bot: any,
    chatId: string,
    forSale: boolean,
  ): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(
        chatId.toString(),
      );
      const cities: any = await this.citiesService.getAll();
      if (cities.length > 0) {
        if (!forSale) {
          const cit = await cities.map((city: any) => [
            {
              text: `${city.title}`,
              callback_data: `city_for_buying_${city.id}`,
            },
          ]);
          await bot.sendMessage(
            chatId,
            'Выберите город (покупка)',

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
              '*****МЕНЮ ГОРОДОВ*****',
              citiesAdminMenuKeyboard,
            );
          }
          if (!currentUser.admin) {
            await bot.sendMessage(
              chatId,
              '*****МЕНЮ ГОРОДОВ*****',
              citiesUserMenuKeyboard,
            );
          }
        }
        if (forSale) {
          const cit = await cities.map((city: any) => [
            {
              text: `${city.title}`,
              callback_data: `city_for_sale_${city.id}`,
            },
          ]);
          await bot.sendMessage(chatId, 'Выберите город (продажа)', {
            reply_markup: JSON.stringify({
              inline_keyboard: cit,
            }),
          }); //.then(async () => {
          //await bot.sendMessage(chatId, `Город удалён`)
          //})
          if (currentUser.admin) {
            await bot.sendMessage(
              chatId,
              '*****МЕНЮ ГОРОДОВ*****',
              citiesAdminMenuKeyboard,
            );
          }
          if (!currentUser.admin) {
            await bot.sendMessage(
              chatId,
              '*****МЕНЮ ГОРОДОВ*****',
              citiesUserMenuKeyboard,
            );
          }
        }
      } else {
        await bot.sendMessage(chatId, 'Города пока не внесены');
      }
    } catch (error) {}
  }

  async onModuleInit(): Promise<void> {}

  async getCityByTitleList(
    bot: any,
    chatId: string,
    forSale: boolean,
  ): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(
        chatId.toString(),
      );
      await bot
        .sendMessage(chatId, 'Введите название города')
        .then(async () => {
          await bot.once('message', async (message: any) => {
            const cities: any = await this.citiesService.getByTitle(
              this.commonService.messageText(message),
            );
            if (cities.length > 0) {
              if (!forSale) {
                const cit = await cities.map((city: any) => [
                  {
                    text: `${city.title}`,
                    callback_data: `city_for_buying_${city.id}`,
                  },
                ]);
                await bot.sendMessage(
                  chatId,
                  'Выберите город (покупка)',

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
                    '*****МЕНЮ ГОРОДОВ*****',
                    citiesAdminMenuKeyboard,
                  );
                }
                if (!currentUser.admin) {
                  await bot.sendMessage(
                    chatId,
                    '*****МЕНЮ ГОРОДОВ*****',
                    citiesUserMenuKeyboard,
                  );
                }
              }
              if (forSale) {
                const cit = await cities.map((city: any) => [
                  {
                    text: `${city.title}`,
                    callback_data: `city_for_sale_${city.id}`,
                  },
                ]);
                await bot.sendMessage(chatId, 'Выберите город (продажа)', {
                  reply_markup: JSON.stringify({
                    inline_keyboard: cit,
                  }),
                }); //.then(async () => {
                //await bot.sendMessage(chatId, `Город удалён`)
                //})
                if (currentUser.admin) {
                  await bot.sendMessage(
                    chatId,
                    '*****МЕНЮ ГОРОДОВ*****',
                    citiesAdminMenuKeyboard,
                  );
                }
                if (!currentUser.admin) {
                  await bot.sendMessage(
                    chatId,
                    '*****МЕНЮ ГОРОДОВ*****',
                    citiesUserMenuKeyboard,
                  );
                }
              }
            }
            if (cities.length === 0) {
              const newCity: any = await this.citiesService.create({
                title: this.commonService.messageText(message),
                other: true,
                userId: currentUser.id,
              });
              await bot.sendMessage(chatId, 'Город был зарегистрирован');
            }
          });
        });
    } catch (error) {}
  }

  async getAllCitiesForUpdateList(bot: any, chatId: string): Promise<void> {
    try {
      const cities: CityEntity[] = await this.citiesService.getAll();

      const cit = await cities.map((city: any) => [
        {
          text: `${city.title}`,
          web_app: { url: `${urls.update_city_form}/` + `${city.id}` },
        },
      ]);

      if (cities.length > 0) {
        await bot.sendMessage(chatId, 'Выберите город для изменения', {
          reply_markup: JSON.stringify({
            inline_keyboard: cit,
          }),
        });
      } else {
        await bot.sendMessage(chatId, 'Городов пока нет');
      }
    } catch (error) {}
  }

  async getAllCitiesForDeleteList(bot: any, chatId: string): Promise<void> {
    try {
      const cities: CityEntity[] = await this.citiesService.getAll();

      const cit = await cities.map((city: any) => [
        { text: `${city.title}`, callback_data: `delete_this_city_${city.id}` },
      ]);

      if (cities.length > 0) {
        await bot.sendMessage(chatId, 'Выберите город для удаления', {
          reply_markup: JSON.stringify({
            inline_keyboard: cit,
          }),
        });
      } else {
        await bot.sendMessage(chatId, 'Городов пока нет');
      }
    } catch (error) {}
  }

  async deleteCity(bot: any, chatId: string, cityId: number): Promise<void> {
    try {
      await this.citiesService.delete(cityId);
      await bot.sendMessage(chatId, 'Город удалён');
    } catch (error) {}
  }
}
