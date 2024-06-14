import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/services/users.service";
import {UsersBotItemsService} from "../users/services/items/usersBotItems.service";
import {UsersFormsService} from "../users/services/forms/usersForms.service";
import {CommonService} from "@app/common/services/common.service";
import {ItemsBotListsService} from "../items/services/lists/itemsBotLists.service";
import {ItemsBotItemService} from "../items/services/items/itemsBotItem.service";
import {CartsBotItemService} from "../cart/services/items/cartsBotItem.service";
import {CartsFormsService} from "../cart/services/forms/cartsForms.service";
import {AdvertisementsBotListService} from "../advertisement/services/lists/advertisementsBotList.service";
import {AdvertisementsItemsService} from "../advertisement/services/items/advertisementsItems.service";
import {ItemsBotFormsService} from "../items/services/forms/itemsBotForms.service";
import {
    adminButtons,
    categoriesAdminMenuKeyboard,
    citiesAdminMenuKeyboard,
    itemsFilterAdminMenuKeyboard,
    mainAdminMenuKeyboard,
    mainUserMenuKeyboard,
    registrationButtons,
    subCategoriesAdminMenuKeyboard,
    usersAdminMenuKeyboard
} from "@app/common";
import {UsersBotListsService} from "../users/services/lists/usersBotLists.service";
import {CitiesBotListService} from "../city/services/lists/citiesBotList.service";
import {CategoriesBotListsService} from "../category/services/lists/categoriesBotLists.service";
import {SubCategoriesBotListService} from "../subCategory/services/lists/subCategoriesBotList.service";
import {SubscribesBotListService} from "../subscription/services/lists/subscribesBotList.service";

@Injectable()
export class AdminService {
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


    async adminHandlersService(bot: any, message: any): Promise<void> {

        const currentUser: any = await this.usersService.getByChatId(this.commonService.messageChatId(message).toString());

        if (!currentUser.banned && !currentUser.isBot) {


            switch (this.commonService.messageText(message)) {

                case registrationButtons.registration:
                    const users = await this.usersService.getAll();
                    if (users.length === 0) {
                        await this.usersService.create(
                            {
                                chatId: this.commonService.messageFrom(message).id.toString(),
                                isBot: this.commonService.messageFrom(message).is_bot,
                                firstName: this.commonService.messageFrom(message).first_name,
                                username: this.commonService.messageFrom(message).username,
                                admin: true
                            }
                        )
                        return bot.sendMessage(this.commonService.messageChatId(message), 'Администратор зарегистрирован',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)))

                    } else {
                        await this.usersService.create(
                            {
                                chatId: this.commonService.messageFrom(message).id.toString(),
                                isBot: this.commonService.messageFrom(message).is_bot,
                                firstName: this.commonService.messageFrom(message).first_name,
                                username: this.commonService.messageFrom(message).username
                            }
                        )
                        return bot.sendMessage(this.commonService.messageChatId(message), 'Пользователь зарегистрирован',
                            await mainUserMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                //*****Главное меню Админ*****
                //Переход в меню расширенного поиска
                case adminButtons.mainMenu.itemsFilter:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****РАСШИРЕННЫЙ ПОИСК*****',
                            itemsFilterAdminMenuKeyboard);
                    }
                    return

                //Переход в меню подкатегорий
                case adminButtons.mainMenu.itemSubCategories:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОДКАТЕГОРИЙ (ПОКУПКА)*****',
                            subCategoriesAdminMenuKeyboard);
                    }
                    return

                //Переход в меню рекламы Админ
                case adminButtons.mainMenu.advertisement:
                    if (currentUser.admin) {
                        return this.advertisementsBotListService.getAllAdvertisementsList(bot,
                            this.commonService.messageChatId(message));
                    }
                    return

                //Переход в меню подписок Админ
                case adminButtons.mainMenu.subscribe:
                    if (currentUser.admin) {
                        return this.subscribesBotListService.getAllSubscribesList(bot, this.commonService.messageChatId(message));
                    }
                    return

                //Переход в меню товаров Админ
                case adminButtons.mainMenu.items:
                    if (currentUser.admin) {
                        return this.itemBotService.getAllItemsList(bot, this.commonService.messageChatId(message));
                    }
                    return

                //Переход в меню пользователей Админ
                case adminButtons.mainMenu.users:
                    if (currentUser.admin) {
                        return this.usersBotListService.getAllUsers(bot, this.commonService.messageChatId(message))
                        //return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОЛЬЗОВАТЕЛЕЙ*****',
                            //usersAdminMenuKeyboard);
                    }
                    return

                //Переход в избранное Админ
                case adminButtons.mainMenu.cart:
                    if (currentUser.admin) {
                        return this.cartsBotItemsService.myCartItem(bot, this.commonService.messageChatId(message));
                    }
                    return

                //Переход в личный профиль
                /*case adminButtons.mainMenu.myProfile:
                    return updateUserFrom(bot, this.commonService.messageChatId(message))*/
                //*****************************************


                //*****Меню товаров для Админ*****
                case adminButtons.items.myItems:
                    if (currentUser.admin) {
                        return this.itemBotService.getAllMyItemsList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.items.buyItem:
                    if (currentUser.admin) {
                        return this.itemBotService.getItemForBuyingList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.items.saleItem:
                    if (currentUser.admin) {
                        return this.itemBotService.getItemsForSaleList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.items.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return



                //*****Меню товаров для покупки Админ*****
                //Переход в меню подкатегорий покупка
                case adminButtons.buyItems.getItemsByPrice:
                    if (currentUser.admin) {
                        return this.itemBotService.getItemsByPricesList(bot, this.commonService.messageChatId(message), false);
                    }
                    return

                /*case adminButtons.buyItems.itemsFilter:
                    return itemCityCategoryPriceFilter(bot, this.commonService.messageChatId(message), false);*/

                case adminButtons.buyItems.findByTitle:
                    if (currentUser.admin) {
                        return this.itemBotService.getItemsByTitleList(bot, this.commonService.messageChatId(message), false);
                    }
                    return

                //Переход в меню городов для покупки Админ
                case adminButtons.buyItems.itemCities:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ГОРОДОВ (ПОКУПКА)*****',
                            citiesAdminMenuKeyboard);
                    }
                    return

                //Переход в меню категорий товаров для покупки Админ
                case adminButtons.buyItems.itemCategories:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ КАТЕГОРИЙ (ПОКУПКА)*****',
                            categoriesAdminMenuKeyboard);
                    }
                    return



                //*****Меню товаров для продажи Админ*****
                //Переход в меню подкатегорий продажа
                /*case adminButtons.saleItems.itemSubCategories:
                    return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОДКАТЕГОРИЙ (ПРОДАЖА)*****',
                        subCategoriesAdminMenuKeyboard);*/

                case adminButtons.saleItems.getItemsByPrice:
                    if (currentUser.admin) {
                        return this.itemBotService.getItemsByPricesList(bot, this.commonService.messageChatId(message), true);
                    }
                    return

                /*case adminButtons.saleItems.itemsFilter:
                    return itemCityCategoryPriceFilter(bot, this.commonService.messageChatId(message), true);*/

                case adminButtons.saleItems.findByTitle:
                    if (currentUser.admin) {
                        return this.itemBotService.getItemsByTitleList(bot, this.commonService.messageChatId(message), true);
                    }
                    return


                //Переход в меню городов для продажи Админ
                case adminButtons.saleItems.itemCities:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ГОРОДОВ (ПРОДАЖА)*****', citiesAdminMenuKeyboard);
                    }
                    return

                //Переход в меню категорий товаров для продажи Админ
                case adminButtons.saleItems.itemCategories:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ КАТЕГОРИЙ (ПРОДАЖА)*****', categoriesAdminMenuKeyboard);
                    }
                    return

                //*****Меню пользователей Админ*****
                case adminButtons.users.findAdmins:
                    if (currentUser.admin) {
                        return this.usersBotListService.getAllAdminsList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.users.findByUsername:
                    if (currentUser.admin) {
                        return this.usersBotListService.getUserByUserNameList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.users.findByFirstName:
                    if (currentUser.admin) {
                        return this.usersBotListService.getUserByFirstNameList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.users.return:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return

                //Меню рекламы Админ
                case adminButtons.advertisement.updateAdvertisement:
                    if (currentUser.admin) {
                        return this.advertisementsBotListService.getAllAdvertisementForUpdateList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.advertisement.deleteAdvertisement:
                    if (currentUser.admin) {
                        return this.advertisementsBotListService.getAllAdvertisementForDeleteList(bot, this.commonService.messageChatId(message))
                    }
                    return

                case adminButtons.advertisement.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return

                //Меню подписок Админ
                case adminButtons.subscribes.updateSubscribe:
                    if (currentUser.admin) {
                        return this.subscribesBotListService.getAllSubscribesForUpdateList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.subscribes.deleteSubscribe:
                    if (currentUser.admin) {
                        return this.subscribesBotListService.getAllSubscribeForDeleteList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.subscribes.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return

                //*****Общее Админ*****

                //Меню городов Админ
                case adminButtons.cities.updateCity:
                    if (currentUser.admin) {
                        return this.citiesBotListService.getAllCitiesForUpdateList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.cities.getItemsByCityForSale:
                    if (currentUser.admin) {
                        return this.citiesBotListService.getCityByTitleList(bot,
                            this.commonService.messageChatId(message), true)
                    }
                    return
                //return getAllCitiesList(bot, chatId(message), true);

                case adminButtons.cities.getItemsByCityForBuying:
                    if (currentUser.admin) {
                        return this.citiesBotListService.getCityByTitleList(bot,
                            this.commonService.messageChatId(message), false)
                    }
                    return
                //return getAllCitiesList(bot, chatId(message), false);

                case adminButtons.cities.deleteCity:
                    if (currentUser.admin) {
                        return this.citiesBotListService.getAllCitiesForDeleteList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.cities.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return

                //Меню категорий
                case adminButtons.categories.updateCategory:
                    if (currentUser.admin) {
                        return this.categoriesBotListsService.getAllCategoriesForUpdateList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.categories.deleteCategory:
                    if (currentUser.admin) {
                        return this.categoriesBotListsService.getAllCategoryForDeleteList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.categories.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return

                case adminButtons.categories.getItemsByCategoryForBuying:
                    if (currentUser.admin) {
                        return this.categoriesBotListsService.getAllCategoriesList(bot,
                            this.commonService.messageChatId(message), false);
                    }
                    return

                case adminButtons.categories.getItemsByCategoryForSale:
                    if (currentUser.admin) {
                        return this.categoriesBotListsService.getAllCategoriesList(bot,
                            this.commonService.messageChatId(message), true);
                    }
                    return

                //Меню подкатегорий
                case adminButtons.subCategories.updateSubCategory:
                    if (currentUser.admin) {
                        return this.subCategoriesBotListService.getAllSubCategoriesForUpdateList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.subCategories.deleteSubCategory:
                    if (currentUser.admin) {
                        return this.subCategoriesBotListService.getAllSubCategoryForDeleteList(bot, this.commonService.messageChatId(message));
                    }
                    return

                case adminButtons.subCategories.getItemsBySubCategoryForBuying:
                    if (currentUser.admin) {
                        return this.subCategoriesBotListService.getAllSubCategoriesList(bot, this.commonService.messageChatId(message), false);
                    }
                    return

                case adminButtons.subCategories.getItemsBySubCategoryForSale:
                    if (currentUser.admin) {
                        return this.subCategoriesBotListService.getAllSubCategoriesList(bot, this.commonService.messageChatId(message), true);
                    }
                    return

                case adminButtons.subCategories.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return

                //Меню корзины пользователя
                case adminButtons.carts.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return

                //Меню расширенного поиска
                case adminButtons.itemsFilers.forBuying:
                    if (currentUser.admin) {
                        return await this.itemBotService.itemsFilter(bot, this.commonService.messageChatId(message), false);
                    }
                    return

                case adminButtons.itemsFilers.forSale:
                    if (currentUser.admin) {
                        return await this.itemBotService.itemsFilter(bot, this.commonService.messageChatId(message), true);
                    }
                    return

                case adminButtons.itemsFilers.cancel:
                    if (currentUser.admin) {
                        return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ АДМИНИСТРАТОРА*****',
                            await mainAdminMenuKeyboard(this.commonService.messageChatId(message)));
                    }
                    return
            }
        }
    }

}