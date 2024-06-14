import {Injectable, OnModuleInit} from "@nestjs/common";
import {ItemService} from "../item.service";
import {UsersService} from "../../../users/services/users.service";

@Injectable()
export class ItemsBotFormsService implements OnModuleInit {
    constructor(
        private readonly itemService: ItemService,
        private readonly userService: UsersService
    ) {
    }

    async deleteItemItem(bot: any, chatId: string, id: number): Promise<void> {
        try {
            const currentUser = await this.userService.getByChatId(chatId.toString())
            const currentItem = await this.itemService.getById(id);
            if (currentUser.admin || chatId.toString() === currentItem.owner) {
                await this.itemService.delete(id).then(async () => {
                    await bot.sendMessage(chatId, 'Товар удалён')
                })
            }
        } catch (error) {
        }

    }

    async markItemAsSoldForm(bot: any, chatId: string, itemId: number): Promise<void> {
        try {
            const currentUser = await this.userService.getByChatId(chatId.toString())
            const currentItem = await this.itemService.getById(itemId);
            if (currentUser.admin || chatId.toString() === currentItem.owner) {
                await this.itemService.update({id: itemId, sold: true})//ItemModel.update({sold: true}, {where: {id: itemId}})
                await bot.sendMessage(chatId, `Товар помечен как проданный/купленный`)
            }
        } catch (error) {
        }
    }

    async markItemAsNotSoldForm(bot: any, chatId: string, itemId: number): Promise<void> {
        try {
            const currentUser = await this.userService.getByChatId(chatId.toString())
            const currentItem = await this.itemService.getById(itemId);
            if (currentUser.admin || chatId.toString() === currentItem.owner) {
                await this.itemService.update({id: itemId, sold: false})//ItemModel.update({sold: true}, {where: {id: itemId}})
                await bot.sendMessage(chatId, `Объявление снова активировано`)
            }
        } catch (error) {
        }
    }

    async onModuleInit(): Promise<void> {

    };
}