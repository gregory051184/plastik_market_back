import {Injectable, OnModuleInit} from "@nestjs/common";
import {SubscribeService} from "../subscribe.service";
import {UsersService} from "../../../users/services/users.service";
import {ConfigService} from "@nestjs/config";
import {adminButtons, adminCallback, mainUserMenuKeyboard, SubscriptionEntity, UserEntity} from "@app/common";

@Injectable()
export class SubscribeBotItemService implements OnModuleInit {
    constructor(
        private readonly subscribesService: SubscribeService,
        private readonly usersService: UsersService,
        private readonly configService: ConfigService,
    ) {
    }

    async getSubscribeById(bot: any, chatId: string, subscribeId: number): Promise<void> {
        try {
            const currentUser: UserEntity = await this.usersService.getByChatId(chatId.toString());
            const subscribe: SubscriptionEntity = await this.subscribesService.getById(subscribeId);
            if (subscribe.id) {
                if (!currentUser.admin) {
                    await bot.sendMessage(chatId, `
                    Наименование - ${subscribe.title}
                    Описание - ${subscribe.description}
                    Цена - ${subscribe.price}
                    `,
                        {
                            'parse_mode': 'markdown',
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [
                                        {
                                            text: 'Купить подписку',
                                            callback_data: `buy_this_subscribe_${subscribe.id}`
                                        }
                                    ]
                                ]
                            })
                        }
                    )
                }
            }

        } catch (error) {
        }
    }

    async subscribePayPageItem(bot: any, chatId: string, subscribeId: number) {
        try {

            const subscribe: any = await this.subscribesService.getById(subscribeId);
            await bot.sendInvoice(
                chatId,
                subscribe.title,
                subscribe.description,
                'payload',
                '381764678:TEST:86637',
                //this.configService.get<string>("PAY_TOKEN"),
                'RUB',
                [
                    {label: `Цена ${subscribe.title}`, amount: subscribe.price * 100}
                ],
                {
                    need_name: true,
                    need_phone_number: true,
                    need_email: true
                }
            )
            return bot.sendMessage(chatId, `*****МЕНЮ ТОВАРОВ*****`, mainUserMenuKeyboard)
        } catch (error) {
            return bot.sendMessage(chatId, `Возникла непредвиденная ошибка`, mainUserMenuKeyboard)
        }
    }

    async onModuleInit(): Promise<void> {

    };
}