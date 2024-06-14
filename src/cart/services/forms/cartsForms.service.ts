import {Injectable, OnModuleInit} from "@nestjs/common";
import {UsersService} from "../../../users/services/users.service";
import {CartService} from "../cart.service";
import {ItemService} from "../../../items/services/item.service";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity, ItemEntity, UserEntity} from "@app/common";
import {Repository} from "typeorm";


@Injectable()
export class CartsFormsService implements OnModuleInit {
    constructor(
        @InjectRepository(ItemEntity) private readonly itemRepository: Repository<ItemEntity>,
        private readonly usersService: UsersService,
        private readonly cartService: CartService,
        private readonly itemService: ItemService,
    ) {
    }

    async addToFavouritesForm(bot: any, chatId: string, itemId: number): Promise<void> {
        try {
            await this.cartService.addItemToFavorite(chatId, itemId)
            /*const currentUser: any = await this.usersService.getByChatId(chatId.toString());
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const item: any = await this.itemService.getByCart(itemId);
            //const item: any = await this.itemService.update({id: itemId, cartId: cart.id});
            item.cart = cart;
            await this.itemRepository.save(item);*/

            return bot.sendMessage(chatId, 'Товар добавлен в избранное');
        } catch (error) {
            return bot.sendMessage(chatId, 'Произошла непредвиденная ошибка');
        }
    };

    async deleteItemFromCartForm(bot: any, chatId: string, itemId: number): Promise<void> {
        try {
            /*const currentUser: UserEntity = await this.usersService.getByChatId(chatId.toString());
            const cart: CartEntity = await this.cartService.getByUserId(currentUser.id);
            const itemIdfForDeleting = cart.items.find((it) => it.id === itemId).id;
            cart.items.splice(itemIdfForDeleting, 1);*/
            await this.cartService.deleteItemFromFavorite(chatId, itemId)
            await bot.sendMessage(chatId, `Товар удалён из корзины`);
        } catch (error) {
            await bot.sendMessage(chatId, `Что-то пошло не так`);
        }
    }

    async onModuleInit(): Promise<void> {

    };

}