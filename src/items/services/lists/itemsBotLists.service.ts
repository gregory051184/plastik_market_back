import {Injectable} from '@nestjs/common';
import {ItemService} from "../item.service";
import {
    adminButtons, adminCallback,
    CartEntity,
    CategoryEntity,
    CityEntity, ItemEntity,
    itemsAdminMenuKeyboard,
    itemsForBuyingAdminMenuKeyboard,
    itemsForBuyingUserMenuKeyboard,
    itemsForSaleAdminMenuKeyboard,
    itemsForSaleUserMenuKeyboard,
    itemsUserMenuKeyboard,
    mainAdminMenuKeyboard,
    mainUserMenuKeyboard,
    SubCategoryEntity,
    urls,
    UserEntity
} from "@app/common";
import {CartService} from "../../../cart/services/cart.service";
import {UsersService} from "../../../users/services/users.service";
import {CategoryService} from "../../../category/services/category.service";
import {CitiesService} from "../../../city/services/cities.service";
import {CommonService} from "@app/common/services/common.service";
import {SubCategoryService} from "../../../subCategory/services/subCategory.service";
import {FilterService} from "./filter.service";
import {ItemsBotItemService} from "../items/itemsBotItem.service";
import {ItemsBotFormsService} from "../forms/itemsBotForms.service";
import {AdvertisementsBotListService} from "../../../advertisement/services/lists/advertisementsBotList.service";
import {CartsFormsService} from "../../../cart/services/forms/cartsForms.service";
import {UsersBotItemsService} from "../../../users/services/items/usersBotItems.service";
import {AdvertisementsItemsService} from "../../../advertisement/services/items/advertisementsItems.service";
import {SubCategoriesBotListService} from "../../../subCategory/services/lists/subCategoriesBotList.service";
import {CitiesBotListService} from "../../../city/services/lists/citiesBotList.service";
import {CategoriesBotListsService} from "../../../category/services/lists/categoriesBotLists.service";
import {UsersFormsService} from "../../../users/services/forms/usersForms.service";
import {CartsBotItemService} from "../../../cart/services/items/cartsBotItem.service";
import {SubscribesBotListService} from "../../../subscription/services/lists/subscribesBotList.service";
import {SubscribeBotItemService} from "../../../subscription/services/items/subscribeBot.item.service";

@Injectable()
export class ItemsBotListsService {
    constructor(
        private readonly itemService: ItemService,
        private readonly cartService: CartService,
        private readonly itemBotItemService: ItemsBotItemService,
        private readonly itemsBotFormsService: ItemsBotFormsService,
        private readonly usersService: UsersService,
        private readonly categoryService: CategoryService,
        private readonly citiesService: CitiesService,
        private readonly commonService: CommonService,
        private readonly subCategoryService: SubCategoryService,
        private readonly filterService: FilterService,
        private readonly advertisementsBotListService: AdvertisementsBotListService,
        private readonly cartsFormsService: CartsFormsService,
        private readonly usersBotItemsService: UsersBotItemsService,
        private readonly advertisementsItemsService: AdvertisementsItemsService,
        private readonly subCategoriesBotListService: SubCategoriesBotListService,
        private readonly citiesBotListService: CitiesBotListService,
        private readonly categoriesBotListService: CategoriesBotListsService,
        private readonly usersFormsService: UsersFormsService,
        private readonly cartsBotItemsService: CartsBotItemService,
        private readonly subscribesBotListService: SubscribesBotListService,
        private readonly subscribeBotItemsService: SubscribeBotItemService
    ) {
    }

    // @ts-ignore
    async pagination(items: ItemEntity[]): Promise<ItemEntity[]> {
        const coff = 2
        const paginatedItems = [];
        let lastPaginationPage = [];

        const newItemsList = items;

        const range = ((items.length) / coff).toString()
        const numberOfFullPages = range.split('.')[0];
        const remain = range.split('.')[1];
        if (remain) {
            const discharge = ('1' + '0'.repeat(remain.length))
            const numbersOfLastPage = (coff * +remain) / +discharge

            let startPosition = Math.max(newItemsList.length - numbersOfLastPage, 1);
            lastPaginationPage = newItemsList.slice(startPosition);
        }


        for (let i = 0; i < +numberOfFullPages; i++) {
            let itemsList = newItemsList.splice(0, coff);
            paginatedItems.push(itemsList);
        }

        if (lastPaginationPage.length > 0) {
            paginatedItems.push(lastPaginationPage);
        }
        return paginatedItems;
    };


    async getPagination(bot: any, chatId: string, items: [any], currentUser: any, cart: any): Promise<any> {

        if (!currentUser.banned && !currentUser.isBot) {

            await bot.removeListener('callback_query')

            await bot.on('callback_query', async (query: any) => {
                switch (true) {

                    //Подробнее о товаре
                    case !!this.commonService.callBackData(query).match(/more_about_item_\d/g):
                        return this.itemBotItemService.getItemByIdItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3])
                    //_____________________________________________________________________________________________________

                    //Пометить товар как завершённый(проданный)
                    case !!this.commonService.callBackData(query).match(/mark_item_as_sold_\d/g):
                        return this.itemsBotFormsService.markItemAsSoldForm(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[4]);
                    //_____________________________________________________________________________________________________

                    //Вернуть товар к продажам
                    case !!this.commonService.callBackData(query).match(/mark_item_as_not_sold_\d/g):
                        return this.itemsBotFormsService.markItemAsNotSoldForm(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[5]);
                    //_____________________________________________________________________________________________________

                    //Перейти к списку рекламы
                    case !!this.commonService.callBackData(query).match(/to_advertisements_list_\d/g)://переход осуществляется через конкретный товар
                        return this.advertisementsBotListService.getAllAdvertisementsList(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3]);
                    //_____________________________________________________________________________________________________

                    //Удалить товар пользователь
                    case !!this.commonService.callBackData(query).match(/удалить_данный_товар_пользователь_\d/g):
                        return this.itemsBotFormsService.deleteItemItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[4]);
                    //_____________________________________________________________________________________________________

                    //Удалить товар админ
                    case !!this.commonService.callBackData(query).match(/удалить_данный_товар_админ_\d/g):
                        return this.itemsBotFormsService.deleteItemItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[4]);
                    //_____________________________________________________________________________________________________

                    //Удалить товар из избранного админ/пользователь
                    case !!this.commonService.callBackData(query).match(/добавить_товар_в_избранное_админ_\d/g):
                        return this.cartsFormsService.addToFavouritesForm(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[5]);
                    //_____________________________________________________________________________________________________

                    //Купить товар у поставщика(получить контакт)
                    case !!this.commonService.callBackData(query).match(/buy_item_\d/g):
                        return this.usersBotItemsService.profileItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[2]);
                    //_____________________________________________________________________________________________________

                    //Удалить товар из корзины пользователь
                    case !!this.commonService.callBackData(query).match(/удалить_из_корзины_пользователь_\d/g):
                        return this.cartsFormsService.deleteItemFromCartForm(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[5]);
                    //_____________________________________________________________________________________________________

                    //Поиск товаров по городам
                    case !!this.commonService.callBackData(query).match(/city_for_buying_\d/g):
                        return this.getItemsByCityList(bot,
                            this.commonService.queryChatId(query), false, +this.commonService.callBackData(query).split('_')[3]);


                    case !!this.commonService.callBackData(query).match(/city_for_sale_\d/g):
                        return this.getItemsByCityList(bot,
                            this.commonService.queryChatId(query), true, +this.commonService.callBackData(query).split('_')[3]);
                    //________________________________________________________________________________________________________________

                    //Удалить город админ
                    case !!this.commonService.callBackData(query).match(/delete_this_city_\d/g):
                        return this.citiesBotListService.deleteCity(bot, this.commonService.queryChatId(query),
                            +this.commonService.callBackData(query).split('_')[3]);
                    //________________________________________________________________________________________________________________

                    //Поиск товаров по категориям
                    case !!this.commonService.callBackData(query).match(/category_for_buying_\d/g):
                        return this.getItemsByCategoryList(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3], false);


                    case !!this.commonService.callBackData(query).match(/category_for_sale_\d/g):
                        return this.getItemsByCategoryList(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3], true);
                    //________________________________________________________________________________________________________________

                    //Удалить категорию админ
                    case !!this.commonService.callBackData(query).match(/delete_this_category_\d/g):
                        return this.categoriesBotListService.deleteCategory(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3])
                    //________________________________________________________________________________________________________________

                    //Поиск товаров по подкатегориям
                    case !!this.commonService.callBackData(query).match(/subCategory_for_buying_\d/g):
                        return this.getItemsBySubCategoryList(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3],
                            false);

                    case !!this.commonService.callBackData(query).match(/subCategory_for_sale_\d/g):
                        return this.getItemsBySubCategoryList(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3],
                            true);
                    //________________________________________________________________________________________________________________

                    //Удалить подкатегорию админ
                    case !!this.commonService.callBackData(query).match(/delete_this_subCategory_\d/g):
                        return this.subCategoriesBotListService.deleteSubCategory(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3]);
                    //________________________________________________________________________________________________________________

                    //Найти товар по названию пользователь
                    case !!this.commonService.callBackData(query).match(/найти_товар_для_покупки_по_названию_пользователь/g):
                        return this.getItemsByTitleList(bot,
                            this.commonService.queryChatId(query), false);

                    case !!this.commonService.callBackData(query).match(/найти_товар_для_продажи_по_названию_пользователь/g):
                        return this.getItemsByTitleList(bot,
                            this.commonService.queryChatId(query), true);
                    //________________________________________________________________________________________________________________

                    //Найти товар по названию админ
                    case !!this.commonService.callBackData(query).match(/найти_товар_для_покупки_по_названию_админ/g):
                        return this.getItemsByTitleList(bot,
                            this.commonService.queryChatId(query), false)

                    case !!this.commonService.callBackData(query).match(/найти_товар_для_продажи_по_названию_админ/g):
                        return this.getItemsByTitleList(bot,
                            this.commonService.queryChatId(query), true);
                    //________________________________________________________________________________________________________________

                    //Подробнее о рекламном блоке пользователь/админ
                    case !!this.commonService.callBackData(query).match(/more_about_advertisement_\d_\d/g):
                        return this.advertisementsItemsService.getAdvertisementByIdItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3],
                            +this.commonService.callBackData(query).split('_')[4]);
                    //________________________________________________________________________________________________________________

                    //Купить рекламный блок пользователь
                    case !!this.commonService.callBackData(query).match(/buy_advertisement_\d_\d/g):
                        return this.advertisementsItemsService.advertisementPayPageItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[2],
                            +this.commonService.callBackData(query).split('_')[3])
                    //________________________________________________________________________________________________________________

                    //Удалить рекламный блок админ
                    case !!this.commonService.callBackData(query).match(/delete_this_advertisement_\d/g):
                        return this.advertisementsBotListService.deleteAdvertisement(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3]);
                    //________________________________________________________________________________________________________________

                    //Все операции с пользователями админ
                    case !!this.commonService.callBackData(query).match(/user_\d/g):
                        return this.usersBotItemsService.getUserByIdItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[1]);

                    case !!this.commonService.callBackData(query).match(/удалить_пользователя_админ_\d/g):
                        return

                    case !!this.commonService.callBackData(query).match(/create_or_ban_admin_\d/g):
                        return this.usersFormsService.createOrBanedAdminForm(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[4]);

                    case !!this.commonService.callBackData(query).match(/забанить_данного_пользователя_админ_\d/g):
                        return this.usersFormsService.bannedUserForm(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[4]);

                    case !!this.commonService.callBackData(query).match(/проверить_корзину_по_id_пользователя_админ_\d/g):
                        return this.cartsBotItemsService.getCartByUserIdItem(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[6]);
                    //________________________________________________________________________________________________________________

                    //Удалить товар из корзины админ
                    case !!this.commonService.callBackData(query).match(/удалить_товар_из_корзины_админ_\d/g):
                        return this.cartsFormsService.deleteItemFromCartForm(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[5]);
                    //________________________________________________________________________________________________________________

                    //Удалить подписку админ
                    case !!this.commonService.callBackData(query).match(/delete_this_subscribe_\d/g):
                        return this.subscribesBotListService.deleteSubscribe(bot,
                            this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3]);
                    //________________________________________________________________________________________________________________


                    case !!this.commonService.callBackData(query).match(/next_item_page_\d/g):
                        let pageNumber = +await this.commonService.callBackData(query).split('_')[3] + 1;
                        const list = items[pageNumber].slice(0, -1)
                        const lastValue = items[pageNumber][items[pageNumber].length - 1]
                        list.map(async (item: any, index: number, array: []) => {
                            await bot.sendPhoto(
                                chatId,
                                item.image,
                                {
                                    'caption':
                                        `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - 
                                        ${item.price} ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(item) ? 'Товар добавлен в избранное' : ''} 
                        `,
                                    'parse_mode': 'markdown',
                                    reply_markup: JSON.stringify({
                                        inline_keyboard: [
                                            [{
                                                text: (currentUser.admin && item.sold) || (item.owner === chatId.toString() && item.sold)
                                                    ? `Сделать активным` : '',
                                                callback_data: `mark_item_as_not_sold_${item.id}`
                                            }],
                                            [{
                                                text: `Подробнее`,
                                                callback_data: `more_about_item_${item.id}`
                                            }],


                                            [{
                                                text: currentUser.admin || item.owner === chatId.toString() ? `Изменить` : '',
                                                web_app: {
                                                    url: `${urls.update_item_form}/` + `${item.id}/` + `${chatId}`
                                                }
                                            }],

                                            [
                                                {
                                                    text: !cart.items.find((it: any) => it.id === item.id) &&
                                                    item.owner !== chatId.toString() ? adminButtons.carts.addToFavorites : '',
                                                    callback_data: `${adminCallback.carts.addToFavorites}_${item.id}`
                                                }
                                            ]
                                        ]
                                    })
                                }
                            )

                        })

                        setTimeout(async () => {
                            await bot.sendPhoto(
                                chatId,
                                lastValue.image,
                                {
                                    'caption':
                                        `${lastValue.forSale ? 'Цена' : 'Желаемая цена покупки'} - 
                                        ${lastValue.price} ${lastValue.unitOfMeasurement ? lastValue.unitOfMeasurement : 'руб.'}
                        ${lastValue.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(lastValue) ? 'Товар добавлен в избранное' : ''} 
                        `,
                                    'parse_mode': 'markdown',
                                    reply_markup: JSON.stringify({
                                        inline_keyboard: [
                                            [{
                                                text: (currentUser.admin && lastValue.sold) || (lastValue.owner === chatId.toString() && lastValue.sold)
                                                    ? `Сделать активным` : '',
                                                callback_data: `mark_item_as_not_sold_${lastValue.id}`
                                            }],
                                            [{
                                                text: `Подробнее`,
                                                callback_data: `more_about_item_${lastValue.id}`
                                            }],


                                            [{
                                                text: currentUser.admin || lastValue.owner === chatId.toString() ? `Изменить` : '',
                                                web_app: {
                                                    url: `${urls.update_item_form}/` + `${lastValue.id}/` + `${chatId}`
                                                }
                                            }],

                                            [
                                                {
                                                    text: !cart.items.find((it: any) => it.id === lastValue.id) &&
                                                    lastValue.owner !== chatId.toString() ? adminButtons.carts.addToFavorites : '',
                                                    callback_data: `${adminCallback.carts.addToFavorites}_${lastValue.id}`
                                                }
                                            ],

                                            [
                                                {
                                                    text: `⬅️ Предыдущая страница`,
                                                    callback_data: `previous_item_page_${+await this.commonService.callBackData(query).split('_')[3] > 0 ?
                                                        +await this.commonService.callBackData(query).split('_')[3] : pageNumber - 1
                                                    }`
                                                },
                                                {
                                                    text: `Следующая страница ➡️`,
                                                    callback_data: `next_item_page_${+await this.commonService.callBackData(query).split('_')[3] <= items.length - 1
                                                        ? pageNumber : +await this.commonService.callBackData(query).split('_')[3]
                                                    }`
                                                }
                                            ],
                                            [
                                                {
                                                    text: `Всего страниц - ${pageNumber + 1}/${items.length}`,
                                                    callback_data: 'items_pages_all'
                                                }
                                            ]

                                        ]
                                    })
                                }
                            )
                        }, 400)
                        return

                    case !!this.commonService.callBackData(query).match(/previous_item_page_\d/g):
                        //let pageNumber = +await this.commonService.callBackData(query).split('_')[3] + 1;
                        const list_1 = items[+await this.commonService.callBackData(query).split('_')[3]].slice(0, -1);
                        const lastValue_1 = items[+await this.commonService.callBackData(query).split('_')[3]][items[+await this.commonService.callBackData(query).split('_')[3]].length - 1];

                        list_1.map(async (item: any, index: number, array: []) => {
                            await bot.sendPhoto(
                                chatId,
                                item.image,
                                {
                                    'caption':
                                        `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - 
                                        ${item.price} ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(item) ? 'Товар добавлен в избранное' : ''} 
                        `,
                                    'parse_mode': 'markdown',
                                    reply_markup: JSON.stringify({
                                        inline_keyboard: [
                                            [{
                                                text: (currentUser.admin && item.sold) || (item.owner === chatId.toString() && item.sold)
                                                    ? `Сделать активным` : '',
                                                callback_data: `mark_item_as_not_sold_${item.id}`
                                            }],
                                            [{
                                                text: `Подробнее`,
                                                callback_data: `more_about_item_${item.id}`
                                            }],


                                            [{
                                                text: currentUser.admin || item.owner === chatId.toString() ? `Изменить` : '',
                                                web_app: {
                                                    url: `${urls.update_item_form}/` + `${item.id}/` + `${chatId}`
                                                }
                                            }],

                                            [
                                                {
                                                    text: !cart.items.find((it: any) => it.id === item.id) &&
                                                    item.owner !== chatId.toString() ? adminButtons.carts.addToFavorites : '',
                                                    callback_data: `${adminCallback.carts.addToFavorites}_${item.id}`
                                                }
                                            ]
                                        ]
                                    })
                                }
                            )

                        })

                        setTimeout(async () => {
                            await bot.sendPhoto(
                                chatId,
                                lastValue_1.image,
                                {
                                    'caption':
                                        `${lastValue_1.forSale ? 'Цена' : 'Желаемая цена покупки'} - 
                                        ${lastValue_1.price} ${lastValue_1.unitOfMeasurement ? lastValue_1.unitOfMeasurement : 'руб.'}
                        ${lastValue_1.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(lastValue_1) ? 'Товар добавлен в избранное' : ''} 
                        `,
                                    'parse_mode': 'markdown',
                                    reply_markup: JSON.stringify({
                                        inline_keyboard: [
                                            [{
                                                text: (currentUser.admin && lastValue_1.sold) || (lastValue_1.owner === chatId.toString() && lastValue_1.sold)
                                                    ? `Сделать активным` : '',
                                                callback_data: `mark_item_as_not_sold_${lastValue_1.id}`
                                            }],
                                            [{
                                                text: `Подробнее`,
                                                callback_data: `more_about_item_${lastValue_1.id}`
                                            }],


                                            [{
                                                text: currentUser.admin || lastValue_1.owner === chatId.toString() ? `Изменить` : '',
                                                web_app: {
                                                    url: `${urls.update_item_form}/` + `${lastValue_1.id}/` + `${chatId}`
                                                }
                                            }],

                                            [
                                                {
                                                    text: !cart.items.find((it: any) => it.id === lastValue_1.id) &&
                                                    lastValue_1.owner !== chatId.toString() ? adminButtons.carts.addToFavorites : '',
                                                    callback_data: `${adminCallback.carts.addToFavorites}_${lastValue_1.id}`
                                                }
                                            ],

                                            [
                                                {
                                                    text: `⬅️ Предыдущая страница`,
                                                    callback_data: `previous_item_page_${+await this.commonService.callBackData(query).split('_')[3] === 0 ?
                                                        +await this.commonService.callBackData(query).split('_')[3] :
                                                        +await this.commonService.callBackData(query).split('_')[3] - 1}`
                                                },
                                                {
                                                    text: `Следующая страница ➡️`,
                                                    callback_data: `next_item_page_${+await this.commonService.callBackData(query).split('_')[3]}`
                                                }
                                            ],
                                            [
                                                {
                                                    text: `Всего страниц - 
                                                    ${+await this.commonService.callBackData(query).split('_')[3] + 1}/${items.length}`,
                                                    callback_data: 'items_pages_all'
                                                }
                                            ]

                                        ]
                                    })
                                }
                            )
                        }, 400)
                        return
                }
            })
        }
    }


    async itemsListHelper(bot: any, chatId: string, items: any, currentUser: any, cart: any): Promise<void> {
        if (items.length > 0) {
            if (items.length === 1) {
                items.map(async (item: any) => {
                    await bot.sendPhoto(
                        chatId,
                        item.image,
                        {
                            'caption':
                                `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${item.price}  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(item) ? 'Товар добавлен в избранное' : ''} 
                        `,
                            'parse_mode': 'markdown',
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [{
                                        text: (currentUser.admin && item.sold) || (item.owner === chatId.toString() && item.sold)
                                            ? `Сделать активным` : '',
                                        callback_data: `mark_item_as_not_sold_${item.id}`
                                    }],
                                    [{
                                        text: `Подробнее`,
                                        callback_data: `more_about_item_${item.id}`
                                    }],


                                    [{
                                        text: currentUser.admin || item.owner === chatId.toString() ? `Изменить` : '',
                                        web_app: {
                                            url: `${urls.update_item_form}/` + `${item.id}/` + `${chatId}`
                                        }
                                    }],

                                    [
                                        {
                                            text: !cart.items.find((it: any) => it.id === item.id) &&
                                            item.owner !== chatId.toString() ? adminButtons.carts.addToFavorites : '',
                                            callback_data: `${adminCallback.carts.addToFavorites}_${item.id}`
                                        }
                                    ]
                                ]
                            })
                        }
                    )
                })
            }
            const itemsByPage: any = await this.pagination(items);
            let i = 0
            const list = itemsByPage[i].slice(0, -1)
            const lastValue = itemsByPage[i][itemsByPage[i].length - 1]
            list.map(async (item: any) => {
                await bot.sendPhoto(
                    chatId,
                    item.image,
                    {
                        'caption':
                            `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${item.price}  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(item) ? 'Товар добавлен в избранное' : ''} 
                        `,
                        'parse_mode': 'markdown',
                        reply_markup: JSON.stringify({
                            inline_keyboard: [


                                [{
                                    text: (currentUser.admin && item.sold) || (item.owner === chatId.toString() && item.sold)
                                        ? `Сделать активным` : '',
                                    callback_data: `mark_item_as_not_sold_${item.id}`
                                }],

                                [{
                                    text: `Подробнее`,
                                    callback_data: `more_about_item_${item.id}`
                                }],

                                [{
                                    text: currentUser.admin || item.owner === chatId.toString() ? `Изменить` : '',
                                    web_app: {
                                        url: `${urls.update_item_form}/` + `${item.id}/` + `${chatId}`
                                    }
                                }],

                                [
                                    {
                                        text: !cart.items.find((it: any) => it.id === item.id) &&
                                        item.owner !== chatId.toString() ? adminButtons.carts.addToFavorites : '',
                                        callback_data: `${adminCallback.carts.addToFavorites}_${item.id}`
                                    }
                                ]
                            ]
                        })
                    }
                )
            })

            setTimeout(async () => {
                await bot.sendPhoto(
                    chatId,
                    lastValue.image,
                    {
                        'caption':
                            `${lastValue.forSale ? 'Цена' : 'Желаемая цена покупки'} - 
                                        ${lastValue.price} ${lastValue.unitOfMeasurement ? lastValue.unitOfMeasurement : 'руб.'}
                        ${lastValue.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(lastValue) ? 'Товар добавлен в избранное' : ''} 
                        `,
                        'parse_mode': 'markdown',
                        reply_markup: JSON.stringify({
                            inline_keyboard: [
                                [{
                                    text: (currentUser.admin && lastValue.sold) || (lastValue.owner === chatId.toString() && lastValue.sold)
                                        ? `Сделать активным` : '',
                                    callback_data: `mark_item_as_not_sold_${lastValue.id}`
                                }],
                                [{
                                    text: `Подробнее`,
                                    callback_data: `more_about_item_${lastValue.id}`
                                }],


                                [{
                                    text: currentUser.admin || lastValue.owner === chatId.toString() ? `Изменить` : '',
                                    web_app: {
                                        url: `${urls.update_item_form}/` + `${lastValue.id}/` + `${chatId}`
                                    }
                                }],

                                [
                                    {
                                        text: !cart.items.find((it: any) => it.id === lastValue.id) &&
                                        lastValue.owner !== chatId.toString() ? adminButtons.carts.addToFavorites : '',
                                        callback_data: `${adminCallback.carts.addToFavorites}_${lastValue.id}`
                                    }
                                ],

                                [
                                    {
                                        text: `⬅️ Предыдущая страница`,
                                        callback_data: `previous_item_page_${i}`
                                    },
                                    {
                                        text: `Следующая страница ➡️`,
                                        callback_data: `next_item_page_${i}`
                                    }
                                ],
                                [
                                    {
                                        text: `Всего страниц - ${i + 1}/${itemsByPage.length}`,
                                        callback_data: 'items_pages_all'
                                    }
                                ]

                            ]
                        })
                    }
                )
            }, 400)

            await this.getPagination(bot, chatId, itemsByPage, currentUser, cart)
        } else {
            await bot.sendMessage(chatId, 'Товаров пока нет');
        }
    }


    async getAllItemsForMainPageList(bot: any, chatId: string): Promise<any> {
        try {
            const items: any = await this.itemService.getAll(chatId);
            if (items.length > 0) {
                items.map(async (item: any) => {
                    await bot.sendPhoto(
                        chatId,
                        item.image,
                        {
                            'caption':
                                `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${item.price} ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ЧТОБЫ УЗНАТЬ БОЛЬШШЕ ЗАРЕГИСТРИРУЙТЕСЬ 
                        `,
                            'parse_mode': 'markdown'

                        }
                    )
                })

            } else {
                await bot.sendMessage(chatId, 'Объявлений пока нет');
            }
        } catch (error) {
        }
    };

    async getAllItemsList(bot: any, chatId: string): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const items: any = await this.itemService.getNotSold();
            if (items.length > 0) {
                items.map(async (item: any) => {
                    await bot.sendPhoto(
                        chatId,
                        item.image,
                        {
                            'caption':
                                `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${item.price}  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${item.cartId === cart.id ? 'Товар добавлен в избранное' : ''} 
                        `,
                            'parse_mode': 'markdown',
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [{text: `Подробнее`, callback_data: `more_about_item_${item.id}`}],


                                    [{
                                        text: currentUser.admin || item.owner === chatId.toString() ? `Изменить` : '',
                                        callback_data: `change_item_${item.id}`
                                    }]
                                ]
                            })
                        }
                    )
                })

            } else {
                await bot.sendMessage(chatId, 'Товаров пока нет');
            }
            if (currentUser.admin) {
                await bot.sendMessage(chatId, '*****ВСЕ ТОВАРЫ*****', itemsAdminMenuKeyboard)
            }
            if (!currentUser.admin) {
                await bot.sendMessage(chatId, '*****ВСЕ ТОВАРЫ*****', itemsUserMenuKeyboard)
            }
        } catch (error) {
        }

    };

    async getAllMyItemsList(bot: any, chatId: string): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const items: any = await this.itemService.getByOwner(chatId);
            await this.itemsListHelper(bot, chatId, items, currentUser, cart)

        } catch (error) {

        }
    };

    async getSoldItemsByOwner(bot: any, chatId: string): Promise<any> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const items: any = await this.itemService.getSoldItemsByOwner(chatId);
            await this.itemsListHelper(bot, chatId, items, currentUser, cart)

        } catch (error) {

        }
    }


    async getItemForBuyingList(bot: any, chatId: string): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const items: any = await this.itemService.getOnlyForBuying();

            //const itemsByPage: any = await this.pagination(items);
            await this.itemsListHelper(bot, chatId, items, currentUser, cart)
            //await this.getPagination(bot, chatId, itemsByPage, currentUser, cart)
            if (currentUser.admin) {
                await bot.sendMessage(chatId, '*****МЕНЮ ТОВАРОВ ДЛЯ ПОКУПКИ*****', itemsForBuyingAdminMenuKeyboard);
            }
            if (!currentUser.admin) {
                await bot.sendMessage(chatId, '*****МЕНЮ ТОВАРОВ ДЛЯ ПОКУПКИ*****', itemsForBuyingUserMenuKeyboard);
            }
        } catch (error) {
        }
    };

    async getItemsByCategoryList(bot: any, chatId: any, categoryId: number, forSale: boolean): Promise<void> {

        try {

            const currentUser: any = await this.usersService.getByChatId(chatId);

            const category: any = await this.categoryService.getById(categoryId)
            const cart: any = await this.cartService.getByUserId(currentUser.id);

            const items: any = await this.itemService.getByCategoryId(categoryId);
            if (!forSale) {
                const forBuyingItems: any = items.filter((item: any) => item.forBuying)
                await this.itemsListHelper(bot, chatId, forBuyingItems, currentUser, cart)

            }
            if (forSale) {
                const forSaleItems: any = items.filter((item: any) => item.forSale && !item.sold)
                await this.itemsListHelper(bot, chatId, forSaleItems, currentUser, cart)

            }
            if (currentUser.admin) {
                await bot.sendMessage(chatId, `*****ТОВАРЫ КАТЕГОРИИ ${category.title}*****`, itemsAdminMenuKeyboard)
            }
            if (!currentUser.admin) {
                await bot.sendMessage(chatId, `*****ТОВАРЫ КАТЕГОРИИ ${category.title}*****`, itemsUserMenuKeyboard)
            } else {
                await bot.sendMessage(chatId, 'Товаров пока нет');
            }
        } catch (error) {
            await bot.sendMessage(chatId, 'Произошла непредвиденная ошибка');
        }
    };

    async getItemsByCityList(bot: any, chatId: string, forSale: boolean, cityId: number): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const city: any = await this.citiesService.getById(cityId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            if (!forSale) {
                const items: any = await this.itemService.getAllBuyingByCityId(cityId);
                await this.itemsListHelper(bot, chatId, items, currentUser, cart)

                if (currentUser.admin && city) {
                    await bot.sendMessage(chatId, `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`, itemsAdminMenuKeyboard)
                }
                if (!currentUser.admin && city) {
                    await bot.sendMessage(chatId, `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`, itemsUserMenuKeyboard)
                }
            }
            if (forSale) {
                const items: any = await this.itemService.getAllSaleByCityId(cityId);
                await this.itemsListHelper(bot, chatId, items, currentUser, cart)

                if (currentUser.admin && city) {
                    await bot.sendMessage(chatId, `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`, itemsAdminMenuKeyboard)
                }
                if (!currentUser.admin && city) {
                    await bot.sendMessage(chatId, `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`, itemsUserMenuKeyboard)
                }
            }
        } catch (error) {
        }
    };

    async getItemsByPricesList(bot: any, chatId: string, forSale: boolean): Promise<void> {
        try {

            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            await bot.sendMessage(chatId,
                'Введите минимальную и максимальную цену за товар в формате: "2000-5000"\n ' +
                'Если хотите фильтровать только по одной цене, тогда введите "2000-2000"').then(async () => {


                await bot.once('message', async (message: any) => {

                    if (this.commonService.messageText(message).match(/\d-\d/)[0]) {

                        const startPrice = +this.commonService.messageText(message).split('-')[0];
                        const finishPrice = +this.commonService.messageText(message).split('-')[1];

                        if (!forSale) {
                            const items: any = await this.itemService.getAllBuyingByPrices(startPrice, finishPrice);
                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)

                            await bot.sendMessage(chatId, `Товары выбраны по цене от ${startPrice} до ${finishPrice}`)
                        }
                        if (forSale) {
                            const items: any = await this.itemService.getAllSaleByPrices(startPrice, finishPrice);
                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)

                            await bot.sendMessage(chatId, `Товары выбраны по цене от ${startPrice} до ${finishPrice}`)
                        }
                    }
                })
            })
        } catch (error) {
        }
    };

    async getItemsByTitleList(bot: any, chatId: string, forSale: boolean): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            await bot.sendMessage(chatId, 'введите наименование товара').then(async () => {
                await bot.once('message', async (message: any) => {

                    if (!forSale) {
                        const items: any = await this.itemService.getAllBuyingByTitle(this.commonService.messageText(message))
                        await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                        await bot.sendMessage(chatId, `Товары выбраны по названию ${this.commonService.messageText(message)}`);
                    }
                    if (forSale) {
                        const items: any = await this.itemService.getAllSaleByTitle(this.commonService.messageText(message))
                        await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                        await bot.sendMessage(chatId, `Товары выбраны по названию ${this.commonService.messageText(message)}`);
                    }
                })
            })
        } catch (error) {
        }
    };

    async getItemsByUserChatIdList(bot: any, chatId: any): Promise<void> {
        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const items: any = await this.itemService.getByOwner(currentUser.chatId);

            await this.itemsListHelper(bot, chatId, items, currentUser, cart)

            if (currentUser.admin) {
                await bot.sendMessage(chatId, '*****ВСЕ ТОВАРЫ*****', itemsAdminMenuKeyboard)
            }
            if (!currentUser.admin) {
                await bot.sendMessage(chatId, '*****ВСЕ ТОВАРЫ*****', itemsUserMenuKeyboard)
            }
        } catch (error) {

        }
    };

    async getItemsForSaleList(bot: any, chatId: string): Promise<void> {
        try {
            await bot.removeListener("callback_query");
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const items: any = await this.itemService.getOnlyForSale();

            await this.itemsListHelper(bot, chatId, items, currentUser, cart)

            if (currentUser.admin) {
                await bot.sendMessage(chatId, '*****МЕНЮ ТОВАРОВ ДЛЯ ПРОДАЖИ*****', itemsForSaleAdminMenuKeyboard);
            }
            if (!currentUser.admin) {
                await bot.sendMessage(chatId, '*****МЕНЮ ТОВАРОВ ДЛЯ ПРОДАЖИ*****', itemsForSaleUserMenuKeyboard)
            }
        } catch (error) {
        }
    };

    async getItemsBySubCategoryList(bot: any, chatId: any, subCategoryId: number, forSale: boolean): Promise<void> {

        try {

            const currentUser: any = await this.usersService.getByChatId(chatId);

            const subCategory: any = await this.subCategoryService.getById(subCategoryId)
            const cart: any = await this.cartService.getByUserId(currentUser.id);

            const items: any = await this.itemService.getBySubCategoryId(subCategoryId);
            if (!forSale) {
                const forBuyingItems: any = items.filter((item: any) => item.forBuying)
                await this.itemsListHelper(bot, chatId, forBuyingItems, currentUser, cart)

            }
            if (forSale) {
                const forSaleItems: any = items.filter((item: any) => item.forSale && !item.sold)
                await this.itemsListHelper(bot, chatId, forSaleItems, currentUser, cart)

            }
            if (currentUser.admin) {
                await bot.sendMessage(chatId, `*****ТОВАРЫ КАТЕГОРИИ ${subCategory.title}*****`, mainAdminMenuKeyboard(chatId))
            }
            if (!currentUser.admin) {
                await bot.sendMessage(chatId, `*****ТОВАРЫ КАТЕГОРИИ ${subCategory.title}*****`, mainUserMenuKeyboard(chatId))
            } else {
                await bot.sendMessage(chatId, 'Товаров пока нет');
            }
        } catch (error) {
            await bot.sendMessage(chatId, 'Произошла непредвиденная ошибка');
        }
    };

    async itemsFilterList(bot: any, chatId: string, data: any): Promise<void> {

        try {
            const currentUser: any = await this.usersService.getByChatId(chatId);
            const cart: any = await this.cartService.getByUserId(currentUser.id);
            const items = await this.filterService.itemFilter(data, data.forSale);
            if (items.length > 0) {
                items.map(async (item: any) => {
                    await bot.sendPhoto(
                        chatId,
                        item.image,
                        {
                            'caption':
                                `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${item.price}  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${cart.items?.includes(item) ? 'Товар добавлен в избранное' : ''} 
                        `,
                            'parse_mode': 'markdown',
                            reply_markup: JSON.stringify({
                                inline_keyboard: [
                                    [{
                                        text: `Подробнее`,
                                        callback_data: `more_about_item_${item.id}`
                                    }],


                                    [{
                                        text: currentUser.admin || item.owner === chatId.toString() ? `Изменить` : '',
                                        web_app: {
                                            url: urls.update_item_form + `/${item.id}` + `/${chatId}`
                                        }
                                    }]
                                ]
                            })
                        }
                    )
                })

            } else {
                await bot.sendMessage(chatId, 'Товаров пока нет');
            }
        } catch (error) {
        }

    }


    async itemsFilter(bot: any, chatId: string, forSale: boolean): Promise<void> {
        await bot.removeListener("callback_query");
        const objectData: any = {
            title: '',
            city: 0,
            category: 0,
            subCategory: 0,
        }
        const currentUser: UserEntity = await this.usersService.getByChatId(chatId.toString());
        const cart: CartEntity = await this.cartService.getByUserId(currentUser.id);
        const categories: CategoryEntity[] = await this.categoryService.getAll();
        const subCategories: SubCategoryEntity[] = await this.subCategoryService.getAll();

        await bot.sendMessage(chatId, '*Выберите один из вариантов фильтрации товаров*', {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: `Город/Подкатегория`, callback_data: `filter_by_city_and_subCategory`}],
                    [{text: `Город/Категория`, callback_data: `filter_by_city_and_category`}],
                    [{text: `Город/Название`, callback_data: `filter_by_city_and_title`}],
                    [{text: `Подкатегория/Название`, callback_data: `filter_by_subCategory_and_title`}],
                    [{text: `Категория/Название`, callback_data: `filter_by_category_and_title`}],

                    [{text: `Категория/Название/Город`, callback_data: `filter_by_category_title_and_city`}],
                    [{text: `Подкатегория/Название/Город`, callback_data: `filter_by_subCategory_title_and_city`}],
                ]
            })
        }).then(async () => {
            await bot.on('callback_query', async (query: any) => {

                switch (true) {

                    case !!this.commonService.callBackData(query).match(/filter_by_city_and_subCategory/g):
                        await bot.sendMessage(this.commonService.queryChatId(query), 'Введите название города').then(async () => {
                            await bot.once('message', async (message: any) => {
                                const cities: CityEntity[] = await this.citiesService.getByTitle(this.commonService.messageText(message));
                                if (cities.length > 0) {
                                    const cits = cities.map((city: any) =>
                                        [{
                                            text: `${city.title}`,
                                            callback_data: `filter_by_city_${city.id}`
                                        }]
                                    )
                                    await bot.sendMessage(
                                        chatId,
                                        'Выберите город',
                                        {
                                            reply_markup: JSON.stringify({
                                                inline_keyboard: cits
                                            })
                                        }
                                    ).then(async () => {
                                        await bot.once('callback_query', async (query: any) => {
                                            if (!!this.commonService.callBackData(query).match(/filter_by_city_\d/g)) {
                                                objectData.city = +this.commonService.callBackData(query).split('_')[3];
                                                const subCategories: SubCategoryEntity[] = await this.subCategoryService.getAll();
                                                const subCats = subCategories.map((subCategory: any) =>
                                                    [{
                                                        text: `${subCategory.title}`,
                                                        callback_data: `filter_by_subCategory_${subCategory.id}`
                                                    }]
                                                )
                                                await bot.sendMessage(
                                                    chatId,
                                                    'Выберите подкатегорию для покупки',
                                                    {
                                                        reply_markup: JSON.stringify({
                                                            inline_keyboard: subCats
                                                        })
                                                    }
                                                ).then(async () => {
                                                    await bot.once('callback_query', async (query: any) => {
                                                        if (!!this.commonService.callBackData(query).match(/filter_by_subCategory_\d/g)) {
                                                            objectData.subCategory = +this.commonService.callBackData(query).split('_')[3]
                                                            const items: any = await this.filterService.itemFilter(objectData, forSale)
                                                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    })
                                } else {
                                    await bot.sendMessage(this.commonService.queryChatId(query), 'Такого города пока нет')
                                }
                            })
                        })
                        return

                    case !!this.commonService.callBackData(query).match(/filter_by_city_and_сategory/g):
                        await bot.sendMessage(this.commonService.queryChatId(query), 'Введите название города').then(async () => {
                            await bot.once('message', async (message: any) => {
                                const cities: CityEntity[] = await this.citiesService.getByTitle(this.commonService.messageText(message));
                                if (cities.length > 0) {
                                    const cits = cities.map((city: any) =>
                                        [{
                                            text: `${city.title}`,
                                            callback_data: `filter_by_city_${city.id}`
                                        }]
                                    )
                                    await bot.sendMessage(
                                        chatId,
                                        'Выберите город',
                                        {
                                            reply_markup: JSON.stringify({
                                                inline_keyboard: cits
                                            })
                                        }
                                    ).then(async () => {
                                        await bot.once('callback_query', async (query: any) => {
                                            if (!!this.commonService.callBackData(query).match(/filter_by_city_\d/g)) {
                                                objectData.city = +this.commonService.callBackData(query).split('_')[3];
                                                const categories: CategoryEntity[] = await this.categoryService.getAll();
                                                const cats = categories.map((category: any) =>
                                                    [{
                                                        text: `${category.title}`,
                                                        callback_data: `filter_by_category_${category.id}`
                                                    }]
                                                )
                                                await bot.sendMessage(
                                                    chatId,
                                                    'Выберите категорию для покупки',
                                                    {
                                                        reply_markup: JSON.stringify({
                                                            inline_keyboard: cats
                                                        })
                                                    }
                                                ).then(async () => {
                                                    await bot.once('callback_query', async (query: any) => {
                                                        if (!!this.commonService.callBackData(query).match(/filter_by_category_\d/g)) {
                                                            objectData.category = +this.commonService.callBackData(query).split('_')[3];
                                                            const items: any = await this.filterService.itemFilter(objectData, forSale);
                                                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)

                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    })
                                } else {
                                    await bot.sendMessage(this.commonService.queryChatId(query), 'Такого города пока нет')
                                }
                            })
                        })
                        return


                    case !!this.commonService.callBackData(query).match(/filter_by_city_and_title/g):
                        await bot.sendMessage(this.commonService.queryChatId(query), 'Введите название города').then(async () => {
                            await bot.once('message', async (message: any) => {
                                const cities: CityEntity[] = await this.citiesService.getByTitle(this.commonService.messageText(message));
                                if (cities.length > 0) {
                                    const cits = await cities.map((city: any) =>
                                        [{
                                            text: `${city.title}`,
                                            callback_data: `filter_by_city_${city.id}`
                                        }]
                                    )
                                    await bot.sendMessage(
                                        chatId,
                                        'Выберите город',
                                        {
                                            reply_markup: JSON.stringify({
                                                inline_keyboard: cits
                                            })
                                        }
                                    ).then(async () => {
                                        await bot.once('callback_query', async (query: any) => {
                                            if (!!this.commonService.callBackData(query).match(/filter_by_city_\d/g)) {
                                                objectData.city = +this.commonService.callBackData(query).split('_')[3];

                                                await bot.sendMessage(chatId, 'Введите название продукта').then(async () => {
                                                    await bot.once('message', async (message: any) => {
                                                        objectData.title = await this.commonService.messageText(message);
                                                        const items: any = await this.filterService.itemFilter(objectData, forSale);
                                                        await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                                                    })
                                                })
                                            }
                                        })
                                    })
                                } else {
                                    await bot.sendMessage(this.commonService.queryChatId(query), 'Такого города пока нет')
                                }
                            })
                        })
                        return

                    case !!this.commonService.callBackData(query).match(/filter_by_subCategory_and_title/g):
                        const subCategories: SubCategoryEntity[] = await this.subCategoryService.getAll();
                        const subCats = subCategories.map((subCategory: any) =>
                            [{
                                text: `${subCategory.title}`,
                                callback_data: `filter_by_subCategory_${subCategory.id}`
                            }]
                        )
                        await bot.sendMessage(
                            chatId,
                            'Выберите подкатегорию',
                            {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: subCats
                                })
                            }
                        ).then(async () => {
                            await bot.once('callback_query', async (query: any) => {
                                if (!!this.commonService.callBackData(query).match(/filter_by_subCategory_\d/g)) {
                                    objectData.subCategory = +this.commonService.callBackData(query).split('_')[3];

                                    await bot.sendMessage(chatId, 'Введите название продукта').then(async () => {
                                        await bot.once('message', async (message: any) => {
                                            objectData.title = await this.commonService.messageText(message);
                                            const items: any = await this.filterService.itemFilter(objectData, forSale);
                                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                                        })
                                    })
                                }
                            })

                        })
                        return

                    case !!this.commonService.callBackData(query).match(/filter_by_category_and_title/g):
                        const categories: CategoryEntity[] = await this.categoryService.getAll();
                        const cats = categories.map((category: any) =>
                            [{
                                text: `${category.title}`,
                                callback_data: `filter_by_category_${category.id}`
                            }]
                        )
                        await bot.sendMessage(
                            chatId,
                            'Выберите категорию',
                            {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: cats
                                })
                            }
                        ).then(async () => {
                            await bot.once('callback_query', async (query: any) => {
                                if (!!this.commonService.callBackData(query).match(/filter_by_category_\d/g)) {
                                    objectData.category = +this.commonService.callBackData(query).split('_')[3];

                                    await bot.sendMessage(chatId, 'Введите название продукта').then(async () => {
                                        await bot.once('message', async (message: any) => {
                                            objectData.title = await this.commonService.messageText(message);
                                            const items: any = await this.filterService.itemFilter(objectData, forSale);
                                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                                        })
                                    })
                                }
                            })
                        })
                        return

                    case !!this.commonService.callBackData(query).match(/filter_by_category_title_and_city/g):
                        const categories_1: CategoryEntity[] = await this.categoryService.getAll();
                        const cats_1 = categories_1.map((category: any) =>
                            [{
                                text: `${category.title}`,
                                callback_data: `filter_by_category_${category.id}`
                            }]
                        )
                        await bot.sendMessage(
                            chatId,
                            'Выберите категорию',
                            {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: cats_1
                                })
                            }
                        ).then(async () => {
                            await bot.once('callback_query', async (query: any) => {
                                if (!!this.commonService.callBackData(query).match(/filter_by_category_\d/g)) {
                                    objectData.category = +this.commonService.callBackData(query).split('_')[3];

                                    await bot.sendMessage(chatId, 'Введите название продукта').then(async () => {
                                        await bot.once('message', async (message: any) => {
                                            objectData.title = await this.commonService.messageText(message);

                                            const cities: CityEntity[] = await this.citiesService.getByTitle(this.commonService.messageText(message));
                                            if (cities.length > 0) {
                                                const cits = await cities.map((city: any) =>
                                                    [{
                                                        text: `${city.title}`,
                                                        callback_data: `filter_by_city_${city.id}`
                                                    }]
                                                )
                                                await bot.sendMessage(
                                                    chatId,
                                                    'Выберите город',
                                                    {
                                                        reply_markup: JSON.stringify({
                                                            inline_keyboard: cits
                                                        })
                                                    }
                                                ).then(async () => {
                                                    await bot.once('callback_query', async (query: any) => {
                                                        if (!!this.commonService.callBackData(query).match(/filter_by_city_\d/g)) {
                                                            objectData.city = +this.commonService.callBackData(query).split('_')[3];
                                                            const items: any = await this.filterService.itemFilter(objectData, forSale);
                                                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    })
                                }
                            })
                        })
                        return

                    case !!this.commonService.callBackData(query).match(/filter_by_subCategory_title_and_city/g):
                        const subCategories_1: CategoryEntity[] = await this.categoryService.getAll();
                        const subCats_1 = subCategories_1.map((subCategory: any) =>
                            [{
                                text: `${subCategory.title}`,
                                callback_data: `filter_by_subCategory_${subCategory.id}`
                            }]
                        )
                        await bot.sendMessage(
                            chatId,
                            'Выберите подкатегорию',
                            {
                                reply_markup: JSON.stringify({
                                    inline_keyboard: subCats_1
                                })
                            }
                        ).then(async () => {
                            await bot.once('callback_query', async (query: any) => {
                                if (!!this.commonService.callBackData(query).match(/filter_by_subCategory_\d/g)) {
                                    objectData.subCategory = +this.commonService.callBackData(query).split('_')[3];

                                    await bot.sendMessage(chatId, 'Введите название продукта').then(async () => {
                                        await bot.once('message', async (message: any) => {
                                            objectData.title = await this.commonService.messageText(message);

                                            const cities: CityEntity[] = await this.citiesService.getByTitle(this.commonService.messageText(message));
                                            if (cities.length > 0) {
                                                const cits = await cities.map((city: any) =>
                                                    [{
                                                        text: `${city.title}`,
                                                        callback_data: `filter_by_city_${city.id}`
                                                    }]
                                                )
                                                await bot.sendMessage(
                                                    chatId,
                                                    'Выберите город',
                                                    {
                                                        reply_markup: JSON.stringify({
                                                            inline_keyboard: cits
                                                        })
                                                    }
                                                ).then(async () => {
                                                    await bot.once('callback_query', async (query: any) => {
                                                        if (!!this.commonService.callBackData(query).match(/filter_by_city_\d/g)) {
                                                            objectData.city = +this.commonService.callBackData(query).split('_')[3];
                                                            const items: any = await this.filterService.itemFilter(objectData, forSale);
                                                            await this.itemsListHelper(bot, chatId, items, currentUser, cart)
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    })
                                }
                            })
                        })
                        return
                }
            })
        })
    }
}
