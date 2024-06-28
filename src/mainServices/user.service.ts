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

        //if (!currentUser.banned && !currentUser.isBot) {

        switch (this.commonService.messageText(message)) {

            //*****Главное меню Пользователь*****

            //Переход в расширенный поиск
            case userButtons.mainMenu.itemsFilter:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****РАСШИРЕННЫЙ ПОИСК*****',
                        itemsFilterUserMenuKeyboard);
                }
                return


            //Переход в меню товаров Пользователь
            case userButtons.mainMenu.items:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getAllItemsList(bot, this.commonService.messageChatId(message));
                }
                return

            //Переход в избранное Пользователь
            case userButtons.mainMenu.cart:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.cartsBotItemsService.myCartItem(bot, this.commonService.messageChatId(message));
                }
                return

            case userButtons.carts.deleteAllItemsFromCart:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.cartsBotItemsService.deleteAllItemsFromCart(bot, this.commonService.messageChatId(message));
                }
                return

            //*****Меню товаров Пользователь*****
            case userButtons.items.myItems:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getAllMyItemsList(bot, this.commonService.messageChatId(message));
                }
                return

            case userButtons.items.buyItem:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemForBuyingList(bot, this.commonService.messageChatId(message));
                }
                return

            case userButtons.items.saleItem:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemsForSaleList(bot, this.commonService.messageChatId(message));
                }
                return

            case userButtons.items.cancel:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
                }
                return


            //*****Меню товаров для покупки Пользователь*****

            case userButtons.buyItems.itemSubCategories:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОДКАТЕГОРИЙ (ПОКУПКА)*****',
                        subCategoriesUserMenuKeyboard);
                }
                return

            case userButtons.buyItems.findByTitle:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemsByTitleList(bot, this.commonService.messageChatId(message), false);
                }
                return


            //*****Меню товаров для продажи Пользователь*****

            case userButtons.saleItems.itemSubCategories:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОДКАТЕГОРИЙ (ПРОДАЖА)*****',
                        subCategoriesUserMenuKeyboard);
                }
                return

            /*case userButtons.saleItems.itemsFilter:
                return itemCityCategoryPriceFilter(bot, this.commonService.queryChatId(message), true);*/

            case userButtons.saleItems.findByTitle:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getItemsByTitleList(bot, this.commonService.messageChatId(message), false);
                }
                return


            //Переход в меню категорий товаров для продажи Пользователь
            case userButtons.saleItems.itemCategories:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ КАТЕГОРИЙ (ПРОДАЖА)*****', categoriesUserMenuKeyboard);
                }
                return


            //*****Общее Пользователь*****

            //Меню городов Пользователь
            case userButtons.cities.getItemsByCityForSale:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.citiesBotListService.getCityByTitleList(bot, this.commonService.messageChatId(message), true)
                }
                return

            case userButtons.cities.getItemsByCityForBuying:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.citiesBotListService.getCityByTitleList(bot, this.commonService.messageChatId(message), false);
                }
                return

            case userButtons.cities.cancel:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
                }
                return

            //Меню категорий
            case userButtons.categories.cancel:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
                }
                return

            case userButtons.categories.getItemsByCategoryForBuying:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.categoriesBotListsService.getAllCategoriesList(bot, this.commonService.messageChatId(message), false);
                }
                return

            case userButtons.categories.getItemsByCategoryForSale:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.categoriesBotListsService.getAllCategoriesList(bot, this.commonService.messageChatId(message), true);
                }
                return

            //Переход в меню профиля пользователя
            case userButtons.mainMenu.myProfile:
                if (currentUser && !currentUser.banned && !currentUser.isBot) {
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
                }
                return


            //Меню профиля пользователя
            case userButtons.profile.subscribe:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.subscribesBotListService.getAllSubscribesList(bot, this.commonService.messageChatId(message));
                }
                return

            case userButtons.profile.mySoldItems:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.itemBotService.getSoldItemsByOwner(bot, this.commonService.messageChatId(message));
                }
                return

            case userButtons.profile.cancel:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
                }
                return


            //Меню подкатегорий
            case userButtons.subCategories.getItemsBySubCategoryForBuying:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.subCategoriesBotListService.getAllSubCategoriesList(bot, this.commonService.messageChatId(message), false);
                }
                return

            case userButtons.subCategories.getItemsBySubCategoryForSale:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return this.subCategoriesBotListService.getAllSubCategoriesList(bot, this.commonService.messageChatId(message), true);
                }
                return

            case userButtons.subCategories.cancel:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
                }
                return

            //Меню расширенного поиска
            case userButtons.itemsFilers.forBuying:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return await this.itemBotService.itemsFilter(bot, this.commonService.messageChatId(message), false);
                }
                return

            case userButtons.itemsFilers.forSale:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return await this.itemBotService.itemsFilter(bot, this.commonService.messageChatId(message), true);
                }
                return

            case userButtons.itemsFilers.cancel:
                if(currentUser && !currentUser.banned && !currentUser.isBot) {
                    await bot.deleteMessage(this.commonService.messageChatId(message), message.message_id)
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
                        await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
                }
                return
        }
        //}

    }
}