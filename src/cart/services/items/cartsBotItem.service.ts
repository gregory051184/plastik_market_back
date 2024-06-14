import {Injectable, OnModuleInit} from "@nestjs/common";
import {UsersService} from "../../../users/services/users.service";
import {CommonService} from "@app/common/services/common.service";
import {
    adminButtons,
    adminCallback, CartEntity,
    cartsAdminMenuKeyboard,
    cartsUserMenuKeyboard, ItemEntity, userButtons, UserEntity
} from "@app/common";
import {CartService} from "../cart.service";
import {ItemService} from "../../../items/services/item.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class CartsBotItemService implements OnModuleInit {
    constructor(
        @InjectRepository(CartEntity) private readonly cartsRepository: Repository<CartEntity>,
        private readonly usersService: UsersService,
        private readonly cartService: CartService,
        private readonly itemService: ItemService
    ) {
    }

    async myCartItem(bot: any, chatId: string): Promise<void> {
        try {

            const currentUser: UserEntity = await this.usersService.getByChatId(chatId.toString());
            const cart: CartEntity = await this.cartService.getByUserId(currentUser.id);
            //const items: any = await this.itemService.getByCart(cart.id)
            const items = cart.items;

            items.map(async (item: any) => {
                await bot.sendPhoto(
                    chatId,
                    item.image,
                    {
                        'caption': `*Цена - ${item.price}*`,
                        'parse_mode': 'markdown',
                        reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [
                                    {text: `Подробнее`, callback_data: `more_about_item_${item.id}`},
                                    {
                                        text: adminButtons.carts.deleteFromCart,
                                        callback_data: `${adminCallback.carts.deleteFromCart}_${item.id}`
                                    }
                                ]
                            ]
                        })
                    }
                )
            })
            if (currentUser.admin) {
                await bot.sendMessage(chatId, '*****МЕНЮ ТОВАРОВ ДЛЯ ПОКУПКИ*****', cartsAdminMenuKeyboard);
            }
            if (!currentUser.admin) {
                await bot.sendMessage(chatId, '*****МЕНЮ ТОВАРОВ ДЛЯ ПОКУПКИ*****', cartsUserMenuKeyboard);
            } else {
                await bot.sendMessage(chatId, 'Товаров пока нет');
            }


        } catch (error) {
        }
    };

    async deleteAllItemsFromCart(bot: any, chatId: string): Promise<void> {
        try {
            const currentUser: UserEntity = await this.usersService.getByChatId(chatId.toString());
            const cart: CartEntity = await this.cartService.getByUserId(currentUser.id);
            cart.items = [];
            await this.cartsRepository.save(cart)
            await bot.sendMessage(chatId, 'Все товары удалены из избранного');

        } catch (error) {
            await bot.sendMessage(chatId, 'Произошла непредвиденная ошибка');
        }


    }

    async getCartByUserIdItem(bot: any, chatId: string, userId: number): Promise<void> {
        try {

            const cart: any = await this.cartService.getByUserId(userId);
            const items: any = await this.itemService.getByCart(cart.id);
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
                                    [
                                        {text: `Подробнее`, callback_data: `item_${item.id}`},
                                        {
                                            text: userButtons.carts.deleteFromCart,
                                            callback_data: `delete_item_from_cart_${item.id}`
                                        }
                                    ]
                                ]
                            })
                        }
                    )
                })
            }
            if (items.length === 0) {

                await bot.sendMessage(chatId, 'Товаров пока не добавлено');
            }

        } catch (error) {

        }

    };

    async onModuleInit(): Promise<void> {

    };

}



