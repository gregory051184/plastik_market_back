import {Injectable, OnModuleInit} from '@nestjs/common';
import {UsersService} from "../users.service";
import {CommonService} from "@app/common/services/common.service";
import {usersAdminMenuKeyboard} from "@app/common";


@Injectable()
export class UsersBotListsService implements OnModuleInit {
    constructor(
        private readonly usersService: UsersService,
        private readonly commonService: CommonService,
    ) {
    }

    async getAllUsers(bot: any, chatId: string): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId.toString());

            if (currentUser.admin) {

                const users = await this.usersService.getAll();

                const listOfUsers = await users.map((user: any) =>
                    [{
                        text: `Подробнее о ${user.username ? user.username : user.firstName}`,
                        callback_data: `get_user_by_id_${user.id}`
                    }]
                )

                await bot.sendMessage(chatId, 'ПОЛЬЗОВАТЕЛИ', {

                    reply_markup: JSON.stringify({
                        inline_keyboard: listOfUsers
                    })
                })

            }

        } catch (error) {

        }
    }

    async getAllAdminsList(bot: any, chatId: string): Promise<void> {
        try {

            const currentUser: any = await this.usersService.getByChatId(chatId.toString());

            if (currentUser.admin) {

                const admins: any = await this.usersService.getAllAdmins();

                const listOfAdmins = await admins.map((admin: any) =>
                    [{text: `Подробнее о ${admin.username}`, callback_data: `user_${admin.id}`}]
                )
                await bot.sendMessage(chatId, 'СПИСОК АДМИНИСТРАТОРОВ', {

                    reply_markup: JSON.stringify({
                        inline_keyboard: listOfAdmins
                    })
                })
            }
            await bot.sendMessage(chatId, `*****МЕНЮ ПОЛЬЗОВАТЕЛЕЙ`, usersAdminMenuKeyboard)
        } catch (error) {
        }

    };

    async getUserByFirstNameList(bot: any, chatId: string): Promise<void> {
        try {

            const currentUser: any = await this.usersService.getByChatId(chatId.toString())

            if (currentUser.admin) {
                await bot.sendMessage(chatId, 'Введите имя пользователя').then(async () => {
                    await bot.once('message', async (message: any) => {
                        const users: any = await this.usersService.getByFirstName(this.commonService.messageText(message))
                        if (users.length > 0) {
                            const listOfUsers = await users.map((user: any) =>
                                [{text: `Подробнее о ${user.username}`, callback_data: `user_${user.id}`}]
                            )
                            await bot.sendMessage(chatId, `СПИСОК ПОЛЬЗОВАТЕЛЕЙ С ИМЕНЕМ ${this.commonService.messageText(message)}`, {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: listOfUsers
                                })
                            })
                            await bot.sendMessage(chatId, `*****МЕНЮ ПОЛЬЗОВАТЕЛЕЙ`, usersAdminMenuKeyboard)
                        } else {
                            await bot.sendMessage(chatId, `Пользователей с именем ${this.commonService.messageText(message)} не найдено`, usersAdminMenuKeyboard)
                        }

                    })

                })

            }
        } catch (error) {
        }
    }

    async getUserByUserNameList(bot: any, chatId: string) {
        try {

            const currentUser: any = await this.usersService.getByChatId(chatId.toString());

            if (currentUser.admin) {
                await bot.sendMessage(chatId, 'Введите имя пользователя (username)').then(async () => {
                    await bot.once('message', async (message: any) => {
                        const users: any = await this.usersService.getByUsername(this.commonService.messageText(message))
                        if (users.length > 0) {
                            const listOfUsers = await users.map((user: any) =>
                                [{text: `Подробнее о ${user.username}`, callback_data: `user_${user.id}`}]
                            )
                            await bot.sendMessage(chatId, `СПИСОК ПОЛЬЗОВАТЕЛЕЙ С ИМЕНЕМ ПОЛЬЗОВАТЕЛЯ (USERNAME) ${this.commonService.messageText(message)}`, {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: listOfUsers
                                })
                            })
                            await bot.sendMessage(chatId, `*****МЕНЮ ПОЛЬЗОВАТЕЛЕЙ`, usersAdminMenuKeyboard)
                        } else {
                            await bot.sendMessage(chatId, `Пользователей с именем пользователя ${this.commonService.messageText(message)} не найдено`, usersAdminMenuKeyboard)
                        }

                    })

                })

            }
        } catch (error) {
        }
    }

    async onModuleInit(): Promise<void> {

    }
}