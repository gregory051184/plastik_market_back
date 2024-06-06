import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { UsersBotItemsService } from '../users/services/items/usersBotItems.service';
import { UsersFormsService } from '../users/services/forms/usersForms.service';
import { UsersBotListsService } from '../users/services/lists/usersBotLists.service';
import { CommonService } from '@app/common/services/common.service';
import { ItemsBotListsService } from '../items/services/lists/itemsBotLists.service';
import { ItemsBotItemService } from '../items/services/items/itemsBotItem.service';
import { CartsBotItemService } from '../cart/services/items/cartsBotItem.service';
import { CartsFormsService } from '../cart/services/forms/cartsForms.service';
import { AdvertisementsBotListService } from '../advertisement/services/lists/advertisementsBotList.service';
import { AdvertisementsItemsService } from '../advertisement/services/items/advertisementsItems.service';
import { ItemsBotFormsService } from '../items/services/forms/itemsBotForms.service';
import { CitiesBotListService } from '../city/services/lists/citiesBotList.service';
import { CategoriesBotListsService } from '../category/services/lists/categoriesBotLists.service';
import {
  categoriesUserMenuKeyboard,
  itemsFilterUserMenuKeyboard,
  mainUserMenuKeyboard,
  profileUserMenuKeyboard,
  subCategoriesUserMenuKeyboard,
  userButtons,
} from '@app/common';
import { SubCategoriesBotListService } from '../subCategory/services/lists/subCategoriesBotList.service';
import { SubscribesBotListService } from '../subscription/services/lists/subscribesBotList.service';

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
  ) {}

  async userHandlersService(bot: any, message: any): Promise<void> {
    switch (this.commonService.messageText(message)) {
      //*****Главное меню Пользователь*****

      //Переход в расширенный поиск
      case userButtons.mainMenu.itemsFilter:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****РАСШИРЕННЫЙ ПОИСК*****',
          itemsFilterUserMenuKeyboard,
        );

      //Переход в меню товаров Пользователь
      case userButtons.mainMenu.items:
        return this.itemBotService.getAllItemsList(
          bot,
          this.commonService.messageChatId(message),
        );

      //Переход в избранное Пользователь
      case userButtons.mainMenu.cart:
        return this.cartsBotItemsService.myCartItem(
          bot,
          this.commonService.messageChatId(message),
        );

      case userButtons.carts.deleteAllItemsFromCart:
        return this.cartsBotItemsService.deleteAllItemsFromCart(
          bot,
          this.commonService.messageChatId(message),
        );

      //*****Меню товаров Пользователь*****
      case userButtons.items.myItems:
        return this.itemBotService.getAllMyItemsList(
          bot,
          this.commonService.messageChatId(message),
        );

      case userButtons.items.buyItem:
        return this.itemBotService.getItemForBuyingList(
          bot,
          this.commonService.messageChatId(message),
        );

      case userButtons.items.saleItem:
        return this.itemBotService.getItemsForSaleList(
          bot,
          this.commonService.messageChatId(message),
        );

      case userButtons.items.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
          await mainUserMenuKeyboard(this.commonService.messageChatId(message)),
        );

      //*****Меню товаров для покупки Пользователь*****

      case userButtons.buyItems.itemSubCategories:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОДКАТЕГОРИЙ (ПОКУПКА)*****',
          subCategoriesUserMenuKeyboard,
        );

      case userButtons.buyItems.findByTitle:
        return this.itemBotService.getItemsByTitleList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      //*****Меню товаров для продажи Пользователь*****

      case userButtons.saleItems.itemSubCategories:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОДКАТЕГОРИЙ (ПРОДАЖА)*****',
          subCategoriesUserMenuKeyboard,
        );

      /*case userButtons.saleItems.itemsFilter:
                return itemCityCategoryPriceFilter(bot, this.commonService.queryChatId(message), true);*/

      case userButtons.saleItems.findByTitle:
        return this.itemBotService.getItemsByTitleList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      //Переход в меню категорий товаров для продажи Пользователь
      case userButtons.saleItems.itemCategories:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ КАТЕГОРИЙ (ПРОДАЖА)*****',
          categoriesUserMenuKeyboard,
        );

      //*****Общее Пользователь*****

      //Меню городов Пользователь
      case userButtons.cities.getItemsByCityForSale:
        return this.citiesBotListService.getCityByTitleList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      case userButtons.cities.getItemsByCityForBuying:
        return this.citiesBotListService.getCityByTitleList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      case userButtons.cities.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
          await mainUserMenuKeyboard(this.commonService.messageChatId(message)),
        );

      //Меню категорий
      case userButtons.categories.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
          await mainUserMenuKeyboard(this.commonService.messageChatId(message)),
        );

      case userButtons.categories.getItemsByCategoryForBuying:
        return this.categoriesBotListsService.getAllCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      case userButtons.categories.getItemsByCategoryForSale:
        return this.categoriesBotListsService.getAllCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      //Переход в меню профиля пользователя
      case userButtons.mainMenu.myProfile:
        try {
          const currentUser = await this.usersService.getByChatId(
            this.commonService.messageChatId(message),
          );
          if (currentUser) {
            return bot.sendMessage(
              this.commonService.messageChatId(message),
              '*****МЕНЮ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ*****',
              await profileUserMenuKeyboard(currentUser.id),
            );
          }
        } catch (error) {
          bot.sendMessage(
            this.commonService.messageChatId(message),
            'Произошла непредвиденная ошибка',
          );
        }
        return;

      //Меню профиля пользователя
      case userButtons.profile.subscribe:
        return this.subscribesBotListService.getAllSubscribesList(
          bot,
          this.commonService.messageChatId(message),
        );

      case userButtons.profile.mySoldItems:
        return this.itemBotService.getSoldItemsByOwner(
          bot,
          this.commonService.messageChatId(message),
        );

      case userButtons.profile.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
          await mainUserMenuKeyboard(this.commonService.messageChatId(message)),
        );

      //Меню подкатегорий
      case userButtons.subCategories.getItemsBySubCategoryForBuying:
        return this.subCategoriesBotListService.getAllSubCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      case userButtons.subCategories.getItemsBySubCategoryForSale:
        return this.subCategoriesBotListService.getAllSubCategoriesList(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      case userButtons.subCategories.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
          await mainUserMenuKeyboard(this.commonService.messageChatId(message)),
        );

      //Меню расширенного поиска
      case userButtons.itemsFilers.forBuying:
        return await this.itemBotService.itemsFilter(
          bot,
          this.commonService.messageChatId(message),
          false,
        );

      case userButtons.itemsFilers.forSale:
        return await this.itemBotService.itemsFilter(
          bot,
          this.commonService.messageChatId(message),
          true,
        );

      case userButtons.itemsFilers.cancel:
        return bot.sendMessage(
          this.commonService.messageChatId(message),
          '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****',
          await mainUserMenuKeyboard(this.commonService.messageChatId(message)),
        );
    }
  }
}
