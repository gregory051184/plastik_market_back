import {Injectable, OnModuleInit} from "@nestjs/common";
import {UsersService} from "../users.service";
import {ItemService} from "../../../items/services/item.service";
import {adminButtons, adminCallback} from "@app/common";

@Injectable()
export class UsersBotItemsService implements OnModuleInit {
    constructor(
        private readonly usersService: UsersService,
        private readonly itemsService: ItemService
    ) {
    }

    async getUserByIdItem(bot: any, chatId: string, userId: number): Promise<void> {
        try {

            const currentUser: any = await this.usersService.getByChatId(chatId.toString());

            if (currentUser.admin) {
                //@ts-ignore
                const user: any = await this.usersService.getById(userId);
                const items: any = await this.itemsService.getByOwner(chatId.toString());



                await bot.sendMessage(
                    chatId,
                    `
            Имя пользователя - ${user.username}\n
            Имя - ${user.firstName}\n
            Чат- ${user.chatId}
            `,
                    {

                        'parse_mode': 'markdown',
                        reply_markup: JSON.stringify({
                            inline_keyboard: [

                                [
                                    {
                                        text: `${adminButtons.users.delete}`,
                                        callback_data: `${adminCallback.users.delete}_${user.id}`
                                    },
                                    {
                                        text: user.admin ? 'Убрать админа' : 'Сделать админом',
                                        callback_data: `create_or_ban_admin_${user.id}`
                                    }
                                ],
                                [
                                    {
                                        text: `Проверить корзину`,
                                        callback_data: `проверить_корзину_админ_${user.id}`
                                    },
                                    {
                                        text: !user.banned ? `Забанить` : 'Разбанить',
                                        callback_data: `забанить_${user.id}`
                                    }
                                ],

                            ]
                        })
                    }
                ).then(async () => {
                    if (items.length > 0) {
                        items.map(async (item: any) => {
                            await bot.sendPhoto(
                                chatId,
                                item.image,
                                {
                                    'caption': `*Цена - ${item.price}*`,
                                    'parse_mode': 'markdown',
                                    reply_markup: JSON.stringify({
                                        inline_keyboard: [
                                            [{text: `Подробнее`, callback_data: `more_about_item_${item.id}`}]
                                        ]
                                    })
                                }
                            )
                        })

                    } else {
                        await bot.sendMessage(chatId, 'Товаров пока нет');
                    }
                })
            }

        } catch (error) {

        }
    };

    async profileItem(bot: any, chatId: string, itemId: number): Promise<void> {
        try {
            const item: any = await this.itemsService.getById(itemId);
            const currentUser: any = await this.usersService.getByChatId(item.owner);
            await bot.sendPhoto(
                chatId,
                item.image,
                {
                    'caption': `
                Наименование - ${item.title}
            Цена - ${item.price} ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
            Описание - ${item.description}
            *****Информация о продавце*****
            Контактное лицо - ${currentUser.contactPerson ? currentUser.contactPerson : 'Нет информации'}
            Телефон - ${currentUser.phone ? currentUser.phone : 'Нет информации'}
            Адрес - ${currentUser.address ? currentUser.address : 'Нет информации'}
            email - ${currentUser.email ? currentUser.email : 'Нет информации'}
            ${currentUser.username ? `Написать в телеграм - @${currentUser.username}` : 'Контакт в телеграм не указан'}
            `
                }
            )
        } catch (error) {
            await bot.sendMessage(chatId, `Возникла непредвиденная ошибка`)
        }
    };


    async onModuleInit(): Promise<void> {

    }
}