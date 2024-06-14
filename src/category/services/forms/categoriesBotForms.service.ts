import {Injectable, OnModuleInit} from "@nestjs/common";
import {itemsAdminMenuKeyboard} from "@app/common";
import {CategoryService} from "../category.service";

@Injectable()
export class CategoriesBotFormsService implements OnModuleInit {
    constructor(
        private readonly categoryService: CategoryService
    ) {
    }

    async delete(bot: any, chatId: any, id: number): Promise<void> {
        await this.categoryService.delete(id).then(async () => {
            await bot.sendMessage(chatId, 'Категория удалёна', itemsAdminMenuKeyboard)
        })
    }

    async onModuleInit(): Promise<void> {

    };
}