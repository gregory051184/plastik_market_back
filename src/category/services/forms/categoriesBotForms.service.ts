import {Injectable, OnModuleInit} from "@nestjs/common";
import {itemsAdminMenuKeyboard} from "@app/common";
import {CategoryService} from "../category.service";
import {UsersService} from "../../../users/services/users.service";


@Injectable()
export class CategoriesBotFormsService implements OnModuleInit {
    constructor(
        private readonly categoryService: CategoryService,
        private readonly usersService: UsersService
    ) {
    }

    async delete(bot: any, chatId: any, id: number): Promise<void> {
        try {
            const currentUser = await this.usersService.getByChatId(chatId);
            if (currentUser.admin) {
                await this.categoryService.delete(id)
                await bot.sendMessage(chatId, 'Категория удалёна', itemsAdminMenuKeyboard)
            }
        } catch (error) {
        }


    }

    async onModuleInit(): Promise<void> {

    };
}