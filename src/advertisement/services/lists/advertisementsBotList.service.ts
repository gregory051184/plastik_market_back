import {Injectable, OnModuleInit} from "@nestjs/common";
import {AdvertisementService} from "../advertisement.service";
import {UsersService} from "../../../users/services/users.service";
import {CommonService} from "@app/common/services/common.service";
import {advertisementAdminMenuKeyboard, AdvertisementEntity, urls} from "@app/common";

@Injectable()
export class AdvertisementsBotListService implements OnModuleInit {
    constructor(
        private readonly advertisementService: AdvertisementService,
        private readonly usersService: UsersService,
        private readonly commonService: CommonService
    ) {
    }

    async getAllAdvertisementsList(bot: any, chatId: string, itemId?: number): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const advertisements: any = await this.advertisementService.findAll();
            if (advertisements.length > 0) {
                advertisements.map(async (advertisement: any) => {
                    await bot.sendMessage(
                        chatId,
                        `Наименование - ${advertisement.title}
                    Цена - ${advertisement.price}
                    `,
                        {
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [{
                                        text: `Подробнее`,
                                        callback_data: `more_about_advertisement_${advertisement.id}_${itemId}`
                                    }],


                                    [{
                                        text: currentUser.admin ? 'Изменить' : '',
                                        callback_data: `change_advertisement_${advertisement.id}`
                                    }]
                                ]
                            })
                        }
                    )
                })
                if (currentUser.admin) {
                    await bot.sendMessage(chatId, '*****МЕНЮ РЕКЛАМЫ*****', advertisementAdminMenuKeyboard);
                }
            }
            if (advertisements.length === 0 && !currentUser.admin) {
                await bot.sendMessage(chatId, 'Рекламы пока нет');
            }
            if (advertisements.length === 0 && currentUser.admin) {
                await bot.sendMessage(chatId, 'Рекламы пока нет', advertisementAdminMenuKeyboard);
            }
        } catch (error) {
        }
    }

    async getAllAdvertisementForUpdateList(bot: any, chatId: string): Promise<void> {

        try {
            const advertisements: AdvertisementEntity[] = await this.advertisementService.findAll();

            const adverts = await advertisements.map((advertisement: any) =>
                [{text: `${advertisement.title}`, web_app: {url: `${urls.update_advertisement_form}/` +  `${advertisement.id}`}}]
            )

            if (advertisements.length > 0) {
                await bot.sendMessage(
                    chatId,
                    'Выберите город для изменения',
                    {
                        reply_markup: JSON.stringify({
                            inline_keyboard: adverts
                        })
                    }
                )
            } else {
                await bot.sendMessage(chatId, 'Рекламных блоков пока нет');
            }
        } catch (error) {
        }
    }

    async getAllAdvertisementForDeleteList(bot: any, chatId: string): Promise<void> {

        try {
            const advertisements: AdvertisementEntity[] = await this.advertisementService.findAll();

            const adverts = await advertisements.map((advertisement: any) =>
                [{text: `${advertisement.title}`, callback_data: `delete_this_advertisement_${advertisement.id}`}]
            )

            if (advertisements.length > 0) {
                await bot.sendMessage(
                    chatId,
                    'Выберите рекламный блок для удаления',
                    {
                        reply_markup: JSON.stringify({
                            inline_keyboard: adverts
                        })
                    }
                )
            } else {
                await bot.sendMessage(chatId, 'Рекламных блок пока нет');
            }
        } catch (error) {
        }
    }


    async deleteAdvertisement(bot: any, chatId: string, advertisementId: number): Promise<void> {
        try {
            await this.advertisementService.delete(advertisementId);
            await bot.sendMessage(chatId, 'Рекламный блок удалён');

        }catch (error) {}
    }

    async onModuleInit(): Promise<void> {

    }
}