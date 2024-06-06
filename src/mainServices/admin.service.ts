import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { UsersBotItemsService } from '../users/services/items/usersBotItems.service';
import { UsersFormsService } from '../users/services/forms/usersForms.service';
import { CommonService } from '@app/common/services/common.service';
import { ItemsBotListsService } from '../items/services/lists/itemsBotLists.service';
import { ItemsBotItemService } from '../items/services/items/itemsBotItem.service';
import { CartsBotItemService } from '../cart/services/items/cartsBotItem.service';
import { CartsFormsService } from '../cart/services/forms/cartsForms.service';
import { AdvertisementsBotListService } from '../advertisement/services/lists/advertisementsBotList.service';
import { AdvertisementsItemsService } from '../advertisement/services/items/advertisementsItems.service';
import { ItemsBotFormsService } from '../items/services/forms/itemsBotForms.service';
import {
  adminButtons,
  categoriesAdminMenuKeyboard,
  citiesAdminMenuKeyboard,
  itemsFilterAdminMenuKeyboard,
  mainAdminMenuKeyboard,
  mainUserMenuKeyboard,
  registrationButtons,
  subCategoriesAdminMenuKeyboard,
  usersAdminMenuKeyboard,
} from '@app/common';
import { UsersBotListsService } from '../users/services/lists/usersBotLists.service';
import { CitiesBotListService } from '../city/services/lists/citiesBotList.service';
import { CategoriesBotListsService } from '../category/services/lists/categoriesBotLists.service';
import { SubCategoriesBotListService } from '../subCategory/services/lists/subCategoriesBotList.service';
import { SubscribesBotListService } from '../subscription/services/lists/subscribesBotList.service';

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
  ) {}

  async adminHandlersService(bot: any, message: any): Promise<void> {
    switch (this.commonService.messageText(message)) {
      case registrationButtons.registration:
        const users = await this.usersService.getAll();
        if (users.length === 0) {
          await this.usersService.create({
            chatId: this.commonService.messageFrom(message).id.toString(),
            isBot: this.commonService.messageFrom(message).is_bot,
            firstName: this.commonService.messageFrom(message).first_name,
            username: this.commonService.messageFrom(message).username,
            admin: true,
          });
          return bot.sendMessage(
            this.commonService.messageChatId(message),
            'Администратор зарегистрирован',
            await mainAdminMenuKeyboard(
              this.commonService.messageChatId(message),
            ),
          );
        } else {
          await this.usersService.create({
            chatId: this.commonService.messageFrom(message).id.toString(),
            isBot: this.commonService.messageFrom(message).is_bot,
            firstName: this.commonService.messageFrom(message).first_name,
            username: this.commonService.messageFrom(message).username,
          });
          return bot.sendMessage(
            this.commonService.messageChatId(message),
            'Пользователь зарегистрирован',
            await mainUserMenuKeyboard(
              this.commonService.messageChatId(message),
            ),
          );
        }
      //*****Главное меню Админ*****
      //Переход в меню расширенного поиска
      case adminButtons.mainMenu.itemsFilter:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****РАСШИРЕННЫЙ ПОИСК*****',
          itemsFilterAdminMenuKeyboard,
        );

      //Переход в меню подкатегорий
      case adminButtons.mainMenu.itemSubCategories:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОДКАТЕГОРИЙ (ПОКУПКА)*****',
          subCategoriesAdminMenuKeyboard,
        );

      //Переход в меню рекламы Админ
      case adminButtons.mainMenu.advertisement:
        return this.advertisementsBotListService.getAllAdvertisementsList(
          bot,
          this.commonService.messageChatId(message),
        );

      //Переход в меню подписок Админ
      case adminButtons.mainMenu.subscribe:
        return this.subscribesBotListService.getAllSubscribesList(
          bot,
          this.commonService.messageChatId(message),
        );

      //Переход в меню товаров Админ
      case adminButtons.mainMenu.items:
        return this.itemBotService.getAllItemsList(
          bot,
          this.commonService.messageChatId(message),
        );

      //Переход в меню пользователей Админ
      case adminButtons.mainMenu.users:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОЛЬЗОВАТЕЛЕЙ*****',
          usersAdminMenuKeyboard,
        );

      //Переход в избранное Админ
      case adminButtons.mainMenu.cart:
        return this.cartsBotItemsService.myCartItem(
          bot,
          this.commonService.messageChatId(message),
        );

      //Переход в личный профиль
      /*case adminButtons.mainMenu.myProfile:
                return updateUserFrom(bot, this.commonService.messageChatId(message))*/
      //*****************************************

      //*****Меню товаров для Админ*****
      case adminButtons.items.myItems:
        return this.itemBotService.getAllMyItemsList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.items.buyItem:
        return this.itemBotService.getItemForBuyingList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.items.saleItem:
        return this.itemBotService.getItemsForSaleList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.items.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      //*****Меню товаров для покупки Админ*****
      //Переход в меню подкатегорий покупка
      case adminButtons.buyItems.getItemsByPrice:
        return this.itemBotService.getItemsByPricesList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      /*case adminButtons.buyItems.itemsFilter:
                return itemCityCategoryPriceFilter(bot, this.commonService.messageChatId(message), false);*/

      case adminButtons.buyItems.findByTitle:
        return this.itemBotService.getItemsByTitleList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      //Переход в меню городов для покупки Админ
      case adminButtons.buyItems.itemCities:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ГОРОДОВ (ПОКУПКА)*****',
          citiesAdminMenuKeyboard,
        );

      //Переход в меню категорий товаров для покупки Админ
      case adminButtons.buyItems.itemCategories:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ КАТЕГОРИЙ (ПОКУПКА)*****',
          categoriesAdminMenuKeyboard,
        );

      //*****Меню товаров для продажи Админ*****
      //Переход в меню подкатегорий продажа
      /*case adminButtons.saleItems.itemSubCategories:
                return bot.sendMessage(this.commonService.messageChatId(message), '*****МЕНЮ ПОДКАТЕГОРИЙ (ПРОДАЖА)*****',
                    subCategoriesAdminMenuKeyboard);*/

      case adminButtons.saleItems.getItemsByPrice:
        return this.itemBotService.getItemsByPricesList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      /*case adminButtons.saleItems.itemsFilter:
                return itemCityCategoryPriceFilter(bot, this.commonService.messageChatId(message), true);*/

      case adminButtons.saleItems.findByTitle:
        return this.itemBotService.getItemsByTitleList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      //Переход в меню городов для продажи Админ
      case adminButtons.saleItems.itemCities:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ГОРОДОВ (ПРОДАЖА)*****',
          citiesAdminMenuKeyboard,
        );

      //Переход в меню категорий товаров для продажи Админ
      case adminButtons.saleItems.itemCategories:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ КАТЕГОРИЙ (ПРОДАЖА)*****',
          categoriesAdminMenuKeyboard,
        );

      //*****Меню пользователей Админ*****
      case adminButtons.users.findAdmins:
        return this.usersBotListService.getAllAdminsList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.users.findByUsername:
        return this.usersBotListService.getUserByUserNameList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.users.findByFirstName:
        return this.usersBotListService.getUserByFirstNameList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.users.return:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      //Меню рекламы Админ
      case adminButtons.advertisement.updateAdvertisement:
        return this.advertisementsBotListService.getAllAdvertisementForUpdateList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.advertisement.deleteAdvertisement:
        return this.advertisementsBotListService.getAllAdvertisementForDeleteList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.advertisement.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      //Меню подписок Админ
      case adminButtons.subscribes.updateSubscribe:
        return this.subscribesBotListService.getAllSubscribesForUpdateList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.subscribes.deleteSubscribe:
        return this.subscribesBotListService.getAllSubscribeForDeleteList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.subscribes.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      //*****Общее Админ*****

      //Меню городов Админ
      case adminButtons.cities.updateCity:
        return this.citiesBotListService.getAllCitiesForUpdateList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.cities.getItemsByCityForSale:
        return this.citiesBotListService.getCityByTitleList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );
      //return getAllCitiesList(bot, chatId(message), true);

      case adminButtons.cities.getItemsByCityForBuying:
        return this.citiesBotListService.getCityByTitleList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );
      //return getAllCitiesList(bot, chatId(message), false);

      case adminButtons.cities.deleteCity:
        return this.citiesBotListService.getAllCitiesForDeleteList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.cities.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      //Меню категорий
      case adminButtons.categories.updateCategory:
        return this.categoriesBotListsService.getAllCategoriesForUpdateList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.categories.deleteCategory:
        return this.categoriesBotListsService.getAllCategoryForDeleteList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.categories.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      case adminButtons.categories.getItemsByCategoryForBuying:
        return this.categoriesBotListsService.getAllCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      case adminButtons.categories.getItemsByCategoryForSale:
        return this.categoriesBotListsService.getAllCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      //Меню подкатегорий
      case adminButtons.subCategories.updateSubCategory:
        return this.subCategoriesBotListService.getAllSubCategoriesForUpdateList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.subCategories.deleteSubCategory:
        return this.subCategoriesBotListService.getAllSubCategoryForDeleteList(
          bot,
          this.commonService.messageChatId(message),
        );

      case adminButtons.subCategories.getItemsBySubCategoryForBuying:
        return this.subCategoriesBotListService.getAllSubCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      case adminButtons.subCategories.getItemsBySubCategoryForSale:
        return this.subCategoriesBotListService.getAllSubCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      case adminButtons.subCategories.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      //Меню корзины пользователя
      case adminButtons.carts.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );

      //Меню расширенного поиска
      case adminButtons.itemsFilers.forBuying:
        return await this.itemBotService.itemsFilter(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      case adminButtons.itemsFilers.forSale:
        return await this.itemBotService.itemsFilter(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      case adminButtons.itemsFilers.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ АДМИНИСТРАТОРА*****',
          await mainAdminMenuKeyboard(
            this.commonService.messageChatId(message),
          ),
        );
    }
  }
}
