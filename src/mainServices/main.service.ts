import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  mainAdminMenuKeyboard,
  mainUserMenuKeyboard,
  registrationMenuKeyboard,
} from '@app/common';
import { UsersService } from '../users/services/users.service';
import { CommonService } from '@app/common/services/common.service';
import { ItemsBotListsService } from '../items/services/lists/itemsBotLists.service';
import { ItemsBotItemService } from '../items/services/items/itemsBotItem.service';
import { UsersBotItemsService } from '../users/services/items/usersBotItems.service';
import { UsersFormsService } from '../users/services/forms/usersForms.service';
import { CartsBotItemService } from '../cart/services/items/cartsBotItem.service';
import { CartsFormsService } from '../cart/services/forms/cartsForms.service';
import { AdvertisementsBotListService } from '../advertisement/services/lists/advertisementsBotList.service';
import { AdvertisementsItemsService } from '../advertisement/services/items/advertisementsItems.service';
import { ItemsBotFormsService } from '../items/services/forms/itemsBotForms.service';
import { AdminService } from './admin.service';
import { UserService } from './user.service';
import { CitiesBotListService } from '../city/services/lists/citiesBotList.service';
import { SubscribesBotListService } from '../subscription/services/lists/subscribesBotList.service';
import { SubscribeBotItemService } from '../subscription/services/items/subscribeBot.item.service';
import { SubCategoriesBotListService } from '../subCategory/services/lists/subCategoriesBotList.service';
import { CategoriesBotListsService } from '../category/services/lists/categoriesBotLists.service';
import { SubscribeService } from '../subscription/services/subscribe.service';

@Injectable()
export class MainService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersBotItemsService: UsersBotItemsService,
    private readonly usersFormsService: UsersFormsService,
    private readonly commonService: CommonService,
    private readonly itemBotService: ItemsBotListsService,
    private readonly itemBotItemService: ItemsBotItemService,
    private readonly cartsBotItemsService: CartsBotItemService,
    private readonly cartsFormsService: CartsFormsService,
    private readonly citiesBotListService: CitiesBotListService,
    private readonly advertisementsBotListService: AdvertisementsBotListService,
    private readonly advertisementsItemsService: AdvertisementsItemsService,
    private readonly itemsBotFormsService: ItemsBotFormsService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly subscribeService: SubscribeService,
    private readonly subscribesBotListService: SubscribesBotListService,
    private readonly subscribeBotItemsService: SubscribeBotItemService,
    private readonly subCategoriesBotListService: SubCategoriesBotListService,
    private readonly categoriesBotListService: CategoriesBotListsService,
  ) {}

  async botOn(): Promise<any> {
    const telegramBot: any = await this.commonService.botStart();

    telegramBot.onText(/\/start/, async (message: any) => {
      const users: any = await this.usersService.getAll();
      const usersChatId: any = users.map((user: any) => user.chatId);
      if (
        !usersChatId.includes(
          this.commonService.messageChatId(message).toString(),
        )
      ) {
        const text = `Приветствую, ${message.from.first_name}, нажмите регистрацию для начала работы`;
        await this.itemBotService.getAllItemsForMainPageList(
          telegramBot,
          +this.commonService.messageChatId(message),
        );
        await telegramBot.sendMessage(
          this.commonService.messageChatId(message),
          text,
          registrationMenuKeyboard,
        );
      } else {
        const user: any = await this.usersService.getByChatId(
          this.commonService.messageChatId(message),
        );
        if (user?.admin) {
          const text = `Приветствую, администратор ${message.from.first_name}!`;
          return telegramBot.sendMessage(
            this.commonService.messageChatId(message),
            text,
            await mainAdminMenuKeyboard(
              this.commonService.messageChatId(message),
            ),
          );
        }
        const text = `Приветствую, ${message.from.first_name}!`;
        return telegramBot.sendMessage(
          this.commonService.messageChatId(message),
          text,
          await mainUserMenuKeyboard(this.commonService.messageChatId(message)),
        );
      }
    });

    telegramBot.on('message', async (message: any) => {
      await this.adminService.adminHandlersService(telegramBot, message);
      await this.userService.userHandlersService(telegramBot, message);
    });

    telegramBot.on('callback_query', async (query: any) => {
      switch (true) {
        //CallBack товары
        case !!this.commonService
          .callBackData(query)
          .match(/найти_товар_для_покупки_по_названию_админ/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemBotService.getItemsByTitleList(
            telegramBot,
            this.commonService.queryChatId(query),
            false,
          );

        case !!this.commonService
          .callBackData(query)
          .match(/найти_товар_для_продажи_по_названию_админ/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemBotService.getItemsByTitleList(
            telegramBot,
            this.commonService.queryChatId(query),
            true,
          );

        case !!this.commonService
          .callBackData(query)
          .match(/more_about_item_\d/g):
          return this.itemBotItemService.getItemByIdItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );

        /*case !!this.commonService.callBackData(query).match(/change_item_\d/g):
                    //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
                    return updateItemForm(telegramBot, this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[2]);*/

        case !!this.commonService
          .callBackData(query)
          .match(/удалить_данный_товар_админ_\d/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemsBotFormsService.deleteItemItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[4],
          );

        case !!this.commonService.callBackData(query).match(/buy_item_\d/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.usersBotItemsService.profileItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[2],
          );

        //CallBack города
        case !!this.commonService
          .callBackData(query)
          .match(/city_for_buying_\d/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemBotService.getItemsByCityList(
            telegramBot,
            this.commonService.queryChatId(query),
            false,
            +this.commonService.callBackData(query).split('_')[3],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/city_for_sale_\d/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemBotService.getItemsByCityList(
            telegramBot,
            this.commonService.queryChatId(query),
            true,
            +this.commonService.callBackData(query).split('_')[3],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/delete_this_city_\d/g):
          return this.citiesBotListService.deleteCity(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );

        //CallBack категории
        case !!this.commonService
          .callBackData(query)
          .match(/category_for_buying_\d/g):
          return this.itemBotService.getItemsByCategoryList(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
            false,
          );

        case !!this.commonService
          .callBackData(query)
          .match(/category_for_sale_\d/g):
          return this.itemBotService.getItemsByCategoryList(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
            true,
          );

        case !!this.commonService
          .callBackData(query)
          .match(/delete_this_category_\d/g):
          return this.categoriesBotListService.deleteCategory(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );

        /*case !!this.commonService.callBackData(query).match(/изменить_данную_категорию_админ_\d/g):
                    return updateCategoryForm(telegramBot, this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[4]);*/

        //CallBack user
        case !!this.commonService.callBackData(query).match(/user_\d/g):
          return this.usersBotItemsService.getUserByIdItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[1],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/удалить_пользователя_админ_\d/g):
          return;

        case !!this.commonService
          .callBackData(query)
          .match(/create_or_ban_admin_\d/g):
          return this.usersFormsService.createOrBanedAdminForm(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[4],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/забанить_данного_пользователя_админ_\d/g):
          return this.usersFormsService.bannedUserForm(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[4],
          );

        //CallBack subCategory
        case !!this.commonService
          .callBackData(query)
          .match(/проверить_корзину_по_id_пользователя_админ_\d/g):
          return this.cartsBotItemsService.getCartByUserIdItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[6],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/добавить_товар_в_избранное_админ_\d/g):
          return this.cartsFormsService.addToFavouritesForm(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[5],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/удалить_товар_из_корзины_админ_\d/g):
          return this.cartsFormsService.deleteItemFromCartForm(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[5],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/subCategory_for_buying_\d/g):
          return this.itemBotService.getItemsBySubCategoryList(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
            false,
          );

        case !!this.commonService
          .callBackData(query)
          .match(/subCategory_for_sale_\d/g):
          return this.itemBotService.getItemsBySubCategoryList(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
            true,
          );
        //CallBack Общие
        /*case !!this.commonService.callBackData(query).match(/отменить_все_действия_и_вернуться_в_главное_меню/g):
                    const currentUser: any = await this.usersService.getByChatId(this.commonService.queryChatId(query));
                    if (currentUser.admin) {
                        await telegramBot.sendMessage(this.commonService.queryChatId(query),
                            '*****МЕНЮ АДМИНИСТРАТОРА*****', mainAdminMenuKeyboard);
                    }
                    if (!currentUser.admin) {
                        await telegramBot.sendMessage(this.commonService.queryChatId(query),
                            '*****МЕНЮ ПОЛЬЗОВАТЕЛЯ*****', mainUserMenuKeyboard);
                    }
                    return*/

        //CallBack Реклама User
        case !!this.commonService
          .callBackData(query)
          .match(/to_advertisements_list_\d/g): //переход осуществляется через конкретный товар
          return this.advertisementsBotListService.getAllAdvertisementsList(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );

        /*case !!this.commonService.callBackData(query).match(/show_all_advertisements_\d/g):
                    return this.advertisementsBotListService.getAllAdvertisementsList(telegramBot,
                        this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[3])*/

        /*case !!this.commonService.callBackData(query).match(/change_advertisement_\d/g):
                    return updateAdvertisementForm(telegramBot, this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[2]);*/

        case !!this.commonService
          .callBackData(query)
          .match(/more_about_advertisement_\d_\d/g):
          return this.advertisementsItemsService.getAdvertisementByIdItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
            +this.commonService.callBackData(query).split('_')[4],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/buy_advertisement_\d_\d/g):
          return this.advertisementsItemsService.advertisementPayPageItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[2],
            +this.commonService.callBackData(query).split('_')[3],
          );

        //CallBack Реклама Admin
        case !!this.commonService
          .callBackData(query)
          .match(/delete_this_advertisement_\d/g):
          return this.advertisementsBotListService.deleteAdvertisement(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );

        //CallBack Пользователь

        //CallBack Товары Пользователь
        case !!this.commonService
          .callBackData(query)
          .match(/найти_товар_для_покупки_по_названию_пользователь/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemBotService.getItemsByTitleList(
            telegramBot,
            this.commonService.queryChatId(query),
            false,
          );

        case !!this.commonService
          .callBackData(query)
          .match(/mark_item_as_sold_\d/g):
          return this.itemsBotFormsService.markItemAsSoldForm(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[4],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/mark_item_as_not_sold_\d/g):
          return this.itemsBotFormsService.markItemAsNotSoldForm(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[5],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/найти_товар_для_продажи_по_названию_пользователь/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemBotService.getItemsByTitleList(
            telegramBot,
            this.commonService.queryChatId(query),
            true,
          );

        case !!this.commonService
          .callBackData(query)
          .match(/удалить_данный_товар_пользователь_\d/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.itemsBotFormsService.deleteItemItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[4],
          );

        //CallBack subCategory Admin
        case !!this.commonService
          .callBackData(query)
          .match(/delete_this_subCategory_\d/g):
          return this.subCategoriesBotListService.deleteSubCategory(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );
        /*case !!this.commonService.callBackData(query).match(/добавить_товар_в_избранное_пользователь_\d/g):
                    //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
                    console.log('ТУТА-ТУТА')
                    return this.cartsFormsService.addToFavouritesForm(telegramBot,
                        this.commonService.queryChatId(query), +this.commonService.callBackData(query).split('_')[5]);*/

        case !!this.commonService
          .callBackData(query)
          .match(/удалить_из_корзины_пользователь_\d/g):
          //await bot.answerCallbackQuery(query.id, {text: '', show_alert: false, cache_time: null});
          return this.cartsFormsService.deleteItemFromCartForm(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[5],
          );

        //CallBack subscribe Admin
        case !!this.commonService
          .callBackData(query)
          .match(/delete_this_subscribe_\d/g):
          return this.subscribesBotListService.deleteSubscribe(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );

        //CallBack subscribe User
        case !!this.commonService.callBackData(query).match(/subscribe_\d/g):
          return this.subscribeBotItemsService.getSubscribeById(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[1],
          );

        case !!this.commonService
          .callBackData(query)
          .match(/buy_this_subscribe_\d/g):
          console.log('тута');
          return this.subscribeBotItemsService.subscribePayPageItem(
            telegramBot,
            this.commonService.queryChatId(query),
            +this.commonService.callBackData(query).split('_')[3],
          );
      }
    });
  }

  async onModuleInit(): Promise<void> {
    await this.botOn();
  }
}
