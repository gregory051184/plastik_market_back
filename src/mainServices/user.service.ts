import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/services/users.service";
import {UsersBotItemsService} from "../users/services/items/usersBotItems.service";
import {UsersFormsService} from "../users/services/forms/usersForms.service";
import {UsersBotListsService} from "../users/services/lists/usersBotLists.service";
import {CommonService} from "@app/common/services/common.service";
import {ItemsBotListsService} from "../items/services/lists/itemsBotLists.service";
import {ItemsBotItemService} from "../items/services/items/itemsBotItem.service";
import {CartsBotItemService} from "../cart/services/items/cartsBotItem.service";
import {CartsFormsService} from "../cart/services/forms/cartsForms.service";
import {AdvertisementsBotListService} from "../advertisement/services/lists/advertisementsBotList.service";
import {AdvertisementsItemsService} from "../advertisement/services/items/advertisementsItems.service";
import {ItemsBotFormsService} from "../items/services/forms/itemsBotForms.service";
import {CitiesBotListService} from "../city/services/lists/citiesBotList.service";
import {CategoriesBotListsService} from "../category/services/lists/categoriesBotLists.service";
import {
    categoriesUserMenuKeyboard, itemsFilterUserMenuKeyboard,
    mainUserMenuKeyboard,
    profileUserMenuKeyboard, subCategoriesUserMenuKeyboard,
    userButtons
} from "@app/common";
import {SubCategoriesBotListService} from "../subCategory/services/lists/subCategoriesBotList.service";
import {SubscribesBotListService} from "../subscription/services/lists/subscribesBotList.service";

@Injectable()
export class UserService {
    constructor(
        private readonly usersService: UsersService,
        private readonly usersBotItemsService: UsersBotItemsService,
        private readonly usersFormsService: UsersFormsService,
        private readonly usersBotListService: UsersBotListsService,
        private readonly commonService: CommonService,
        private readonly itemBotService: ItemsBotListsService,
        private readonly itemBotItemService: ItemsBotItemService,
        private readonly cartsBotItemsService: CartsBotItemService,
        private readonly cartsFormsService: CartsFormsService,
        private readonly advertisementsBotListService: AdvertisementsBotListService,
        private readonly advertisementsItemsService: AdvertisementsItemsService,
        private readonly itemsBotFormsService: ItemsBotFormsService,
        private readonly citiesBotListService: CitiesBotListService,
        private readonly categoriesBotListsService: CategoriesBotListsService,
        private readonly subCategoriesBotListService: SubCategoriesBotListService,
        private readonly subscribesBotListService: SubscribesBotListService,
    ) {
    }

    async userHandlersService(bot: any, message: any): Promise<void> {
        const currentUser: any = await this.usersService.getByChatId(this.commonService.messageChatId(message).toString());

        if (!currentUser.banned && !currentUser.isBot) {

            switch (this.commonService.messageText(message)) {

                //*****Главное меню Пользователь*****

                //Переход в расширенный поиск
                case userButtons.mainMenu.itemsFilter:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****РАСШИРЕННЫЙ ПОИСК*****',
                        itemsFilterUserMenuKeyboard);

                //Переход в меню товаров Пользователь
                case userButtons.mainMenu.items:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getAllItemsList(bot, this.commonService.messageChatId(message));

                //Переход в избранное Пользователь
                case userButtons.mainMenu.cart:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.cartsBotItemsService.myCartItem(bot, this.commonService.messageChatId(message));

                case userButtons.carts.deleteAllItemsFromCart:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.cartsBotItemsService.deleteAllItemsFromCart(bot, this.commonService.messageChatId(message))

                //*****Меню товаров Пользователь*****
                case userButtons.items.myItems:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getAllMyItemsList(bot, this.commonService.messageChatId(message));

                case userButtons.items.buyItem:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemForBuyingList(bot, this.commonService.messageChatId(message));

                case userButtons.items.saleItem:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemsForSaleList(bot, this.commonService.messageChatId(message));

                case userButtons.items.cancel:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));


                //*****Меню товаров для покупки Пользователь*****

                case userButtons.buyItems.itemSubCategories:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОДКАТЕГОРИЙ (ПОКУПКА)*****',
                        subCategoriesUserMenuKeyboard);

                case userButtons.buyItems.findByTitle:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemsByTitleList(bot, this.commonService.messageChatId(message), false);


                //*****Меню товаров для продажи Пользователь*****

                case userButtons.saleItems.itemSubCategories:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОДКАТЕГОРИЙ (ПРОДАЖА)*****',
                        subCategoriesUserMenuKeyboard);

                /*case userButtons.saleItems.itemsFilter:
                    return itemCityCategoryPriceFilter(bot, this.commonService.queryChatId(message), true);*/

                case userButtons.saleItems.findByTitle:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemsByTitleList(bot, this.commonService.messageChatId(message), false);


                //Переход в меню категорий товаров для продажи Пользователь
                case userButtons.saleItems.itemCategories:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ КАТЕГОРИЙ (ПРОДАЖА)*****', categoriesUserMenuKeyboard);


                //*****Общее Пользователь*****

                //Меню городов Пользователь
                case userButtons.cities.getItemsByCityForSale:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.citiesBotListService.getCityByTitleList(bot, this.commonService.messageChatId(message), true)

                case userButtons.cities.getItemsByCityForBuying:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.citiesBotListService.getCityByTitleList(bot, this.commonService.messageChatId(message), false)

                case userButtons.cities.cancel:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));

                //Меню категорий
                case userButtons.categories.cancel:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));

                case userButtons.categories.getItemsByCategoryForBuying:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.categoriesBotListsService.getAllCategoriesList(bot, this.commonService.messageChatId(message), false);

                case userButtons.categories.getItemsByCategoryForSale:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.categoriesBotListsService.getAllCategoriesList(bot, this.commonService.messageChatId(message), true);

                //Переход в меню профиля пользователя
                case userButtons.mainMenu.myProfile:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    try {
                        const currentUser = await this.usersService.getByChatId(this.commonService.messageChatId(message))
                        if (currentUser) {
                            return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ*****',
                                await profileUserMenuKeyboard(currentUser.id));
                        }
                    } catch (error) {
                        bot.sendMessage(this.commonService.messageChatId(message), 'Произошла непредвиденная ошибка')
                    }
                    return


                //Меню профиля пользователя
                case userButtons.profile.subscribe:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.subscribesBotListService.getAllSubscribesList(bot, this.commonService.messageChatId(message));

                case userButtons.profile.mySoldItems:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getSoldItemsByOwner(bot, this.commonService.messageChatId(message));

                case userButtons.profile.cancel:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));


                //Меню подкатегорий
                case userButtons.subCategories.getItemsBySubCategoryForBuying:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.subCategoriesBotListService.getAllSubCategoriesList(bot, this.commonService.messageChatId(message), false);

                case userButtons.subCategories.getItemsBySubCategoryForSale:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.subCategoriesBotListService.getAllSubCategoriesList(bot, this.commonService.messageChatId(message), true);

                case userButtons.subCategories.cancel:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));

                //Меню расширенного поиска
                case userButtons.itemsFilers.forBuying:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return await this.itemBotService.itemsFilter(bot, this.commonService.messageChatId(message), false);

                case userButtons.itemsFilers.forSale:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return await this.itemBotService.itemsFilter(bot, this.commonService.messageChatId(message), true);

                case userButtons.itemsFilers.cancel:
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
            }
        }

    }
}