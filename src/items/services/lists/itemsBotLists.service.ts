import { Injectable } from '@nestjs/common';
import { ItemService } from '../item.service';
import {
  CartEntity,
  CategoryEntity,
  CityEntity,
  ItemEntity,
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
  UserEntity,
} from '@app/common';
import { CartService } from '../../../cart/services/cart.service';
import { UsersService } from '../../../users/services/users.service';
import { CategoryService } from '../../../category/services/category.service';
import { CitiesService } from '../../../city/services/cities.service';
import { CommonService } from '@app/common/services/common.service';
import { SubCategoryService } from '../../../subCategory/services/subCategory.service';
import { FilterService } from './filter.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsBotListsService {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
    private readonly itemService: ItemService,
    private readonly cartService: CartService,
    private readonly usersService: UsersService,
    private readonly categoryService: CategoryService,
    private readonly citiesService: CitiesService,
    private readonly commonService: CommonService,
    private readonly subCategoryService: SubCategoryService,
    private readonly filterService: FilterService,
  ) {}

  async itemsListHelper(
    bot: any,
    chatId: string,
    items: [any],
    currentUser: any,
    cart: any,
  ): Promise<void> {
    //Менял на ${cart.items.includes(item) ? 'Товар добавлен в избранное' : ''}
    //${item.cartId === cart.id ? 'Товар добавлен в избранное' : ''}
    if (items.length > 0) {
      items.map(async (item: any) => {
        await bot.sendPhoto(chatId, item.image, {
          caption: `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${
            item.price
          }  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${
                          cart.items?.includes(item)
                            ? 'Товар добавлен в избранное'
                            : ''
                        } 
                        `,
          parse_mode: 'markdown',
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [
                {
                  text:
                    (currentUser.admin && item.sold) ||
                    (item.owner === chatId.toString() && item.sold)
                      ? `Сделать активным`
                      : '',
                  callback_data: `mark_item_as_not_sold_${item.id}`,
                },
              ],
              [
                {
                  text: `Подробнее`,
                  callback_data: `more_about_item_${item.id}`,
                },
              ],

              [
                {
                  text:
                    currentUser.admin || item.owner === chatId.toString()
                      ? `Изменить`
                      : '',
                  web_app: {
                    url:
                      `${urls.update_item_form}/` + `${item.id}/` + `${chatId}`,
                  },
                },
              ],
            ],
          }),
        });
      });
    } else {
      await bot.sendMessage(chatId, 'Товаров пока нет');
    }
  }

  async getAllItemsForMainPageList(bot: any, chatId: number): Promise<any> {
    try {
      const items: any = await this.itemService.getAll();
      if (items.length > 0) {
        items.map(async (item: any) => {
          await bot.sendPhoto(chatId, item.image, {
            caption: `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${
              item.price
            } ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ЧТОБЫ УЗНАТЬ БОЛЬШШЕ ЗАРЕГИСТРИРУЙТЕСЬ 
                        `,
            parse_mode: 'markdown',
          });
        });
      } else {
        await bot.sendMessage(chatId, 'Объявлений пока нет');
      }
    } catch (error) {}
  }

  async getAllItemsList(bot: any, chatId: string): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const items: any = await this.itemService.getNotSold();
      if (items.length > 0) {
        items.map(async (item: any) => {
          await bot.sendPhoto(chatId, item.image, {
            caption: `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${
              item.price
            }  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${
                          item.cartId === cart.id
                            ? 'Товар добавлен в избранное'
                            : ''
                        } 
                        `,
            parse_mode: 'markdown',
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: `Подробнее`,
                    callback_data: `more_about_item_${item.id}`,
                  },
                ],

                [
                  {
                    text:
                      currentUser.admin || item.owner === chatId.toString()
                        ? `Изменить`
                        : '',
                    callback_data: `change_item_${item.id}`,
                  },
                ],
              ],
            }),
          });
        });
      } else {
        await bot.sendMessage(chatId, 'Товаров пока нет');
      }
      if (currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****ВСЕ ТОВАРЫ*****',
          itemsAdminMenuKeyboard,
        );
      }
      if (!currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****ВСЕ ТОВАРЫ*****',
          itemsUserMenuKeyboard,
        );
      }
    } catch (error) {}
  }

  async getAllMyItemsList(bot: any, chatId: string): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const items: any = await this.itemService.getByOwner(chatId);
      await this.itemsListHelper(bot, chatId, items, currentUser, cart);
    } catch (error) {}
  }

  async getSoldItemsByOwner(bot: any, chatId: string): Promise<any> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const items: any = await this.itemService.getSoldItemsByOwner(chatId);
      await this.itemsListHelper(bot, chatId, items, currentUser, cart);
    } catch (error) {}
  }

  async getItemForBuyingList(bot: any, chatId: string): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const items: any = await this.itemService.getOnlyForBuying();

      await this.itemsListHelper(bot, chatId, items, currentUser, cart);

      if (currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****МЕНЮ ТОВАРОВ ДЛЯ ПОКУПКИ*****',
          itemsForBuyingAdminMenuKeyboard,
        );
      }
      if (!currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****МЕНЮ ТОВАРОВ ДЛЯ ПОКУПКИ*****',
          itemsForBuyingUserMenuKeyboard,
        );
      }
    } catch (error) {}
  }

  async getItemsByCategoryList(
    bot: any,
    chatId: any,
    categoryId: number,
    forSale: boolean,
  ): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);

      const category: any = await this.categoryService.getById(categoryId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);

      const items: any = await this.itemService.getByCategoryId(categoryId);
      if (!forSale) {
        const forBuyingItems: any = items.filter((item: any) => item.forBuying);
        await this.itemsListHelper(
          bot,
          chatId,
          forBuyingItems,
          currentUser,
          cart,
        );
      }
      if (forSale) {
        const forSaleItems: any = items.filter(
          (item: any) => item.forSale && !item.sold,
        );
        await this.itemsListHelper(
          bot,
          chatId,
          forSaleItems,
          currentUser,
          cart,
        );
      }
      if (currentUser.admin) {
        await bot.sendMessage(
          chatId,
          `*****ТОВАРЫ КАТЕГОРИИ ${category.title}*****`,
          itemsAdminMenuKeyboard,
        );
      }
      if (!currentUser.admin) {
        await bot.sendMessage(
          chatId,
          `*****ТОВАРЫ КАТЕГОРИИ ${category.title}*****`,
          itemsUserMenuKeyboard,
        );
      } else {
        await bot.sendMessage(chatId, 'Товаров пока нет');
      }
    } catch (error) {
      await bot.sendMessage(chatId, 'Произошла непредвиденная ошибка');
    }
  }

  async getItemsByCityList(
    bot: any,
    chatId: string,
    forSale: boolean,
    cityId: number,
  ): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const city: any = await this.citiesService.getById(cityId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      if (!forSale) {
        const items: any = await this.itemService.getAllBuyingByCityId(cityId);
        await this.itemsListHelper(bot, chatId, items, currentUser, cart);

        if (currentUser.admin && city) {
          await bot.sendMessage(
            chatId,
            `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`,
            itemsAdminMenuKeyboard,
          );
        }
        if (!currentUser.admin && city) {
          await bot.sendMessage(
            chatId,
            `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`,
            itemsUserMenuKeyboard,
          );
        }
      }
      if (forSale) {
        const items: any = await this.itemService.getAllSaleByCityId(cityId);
        await this.itemsListHelper(bot, chatId, items, currentUser, cart);

        if (currentUser.admin && city) {
          await bot.sendMessage(
            chatId,
            `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`,
            itemsAdminMenuKeyboard,
          );
        }
        if (!currentUser.admin && city) {
          await bot.sendMessage(
            chatId,
            `*****ТОВАРЫ В ГОРОДЕ ${city.title}*****`,
            itemsUserMenuKeyboard,
          );
        }
      }
    } catch (error) {}
  }

  async getItemsByPricesList(
    bot: any,
    chatId: string,
    forSale: boolean,
  ): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      await bot
        .sendMessage(
          chatId,
          'Введите минимальную и максимальную цену за товар в формате: "2000-5000"\n ' +
            'Если хотите фильтровать только по одной цене, тогда введите "2000-2000"',
        )
        .then(async () => {
          await bot.once('message', async (message: any) => {
            if (this.commonService.messageText(message).match(/\d-\d/)[0]) {
              const startPrice = +this.commonService
                .messageText(message)
                .split('-')[0];
              const finishPrice = +this.commonService
                .messageText(message)
                .split('-')[1];

              if (!forSale) {
                const items: any = await this.itemService.getAllBuyingByPrices(
                  startPrice,
                  finishPrice,
                );
                await this.itemsListHelper(
                  bot,
                  chatId,
                  items,
                  currentUser,
                  cart,
                );

                await bot.sendMessage(
                  chatId,
                  `Товары выбраны по цене от ${startPrice} до ${finishPrice}`,
                );
              }
              if (forSale) {
                const items: any = await this.itemService.getAllSaleByPrices(
                  startPrice,
                  finishPrice,
                );
                await this.itemsListHelper(
                  bot,
                  chatId,
                  items,
                  currentUser,
                  cart,
                );

                await bot.sendMessage(
                  chatId,
                  `Товары выбраны по цене от ${startPrice} до ${finishPrice}`,
                );
              }
            }
          });
        });
    } catch (error) {}
  }

  async getItemsByTitleList(
    bot: any,
    chatId: string,
    forSale: boolean,
  ): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      await bot
        .sendMessage(chatId, 'введите наименование товара')
        .then(async () => {
          await bot.once('message', async (message: any) => {
            if (!forSale) {
              const items: any = await this.itemService.getAllBuyingByTitle(
                this.commonService.messageText(message),
              );
              await this.itemsListHelper(bot, chatId, items, currentUser, cart);

              await bot.sendMessage(
                chatId,
                `Товары выбраны по названию ${this.commonService.messageText(
                  message,
                )}`,
              );
            }
            if (forSale) {
              const items: any = await this.itemService.getAllSaleByTitle(
                this.commonService.messageText(message),
              );
              await this.itemsListHelper(bot, chatId, items, currentUser, cart);
              await bot.sendMessage(
                chatId,
                `Товары выбраны по названию ${this.commonService.messageText(
                  message,
                )}`,
              );
            }
          });
        });
    } catch (error) {}
  }

  async getItemsByUserChatIdList(bot: any, chatId: any): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const items: any = await this.itemService.getByOwner(currentUser.chatId);

      await this.itemsListHelper(bot, chatId, items, currentUser, cart);

      if (currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****ВСЕ ТОВАРЫ*****',
          itemsAdminMenuKeyboard,
        );
      }
      if (!currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****ВСЕ ТОВАРЫ*****',
          itemsUserMenuKeyboard,
        );
      }
    } catch (error) {}
  }

  async getItemsForSaleList(bot: any, chatId: string): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const items: any = await this.itemService.getOnlyForSale();

      await this.itemsListHelper(bot, chatId, items, currentUser, cart);

      if (currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****МЕНЮ ТОВАРОВ ДЛЯ ПРОДАЖИ*****',
          itemsForSaleAdminMenuKeyboard,
        );
      }
      if (!currentUser.admin) {
        await bot.sendMessage(
          chatId,
          '*****МЕНЮ ТОВАРОВ ДЛЯ ПРОДАЖИ*****',
          itemsForSaleUserMenuKeyboard,
        );
      }
    } catch (error) {}
  }

  async getItemsBySubCategoryList(
    bot: any,
    chatId: any,
    subCategoryId: number,
    forSale: boolean,
  ): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);

      const subCategory: any = await this.subCategoryService.getById(
        subCategoryId,
      );
      const cart: any = await this.cartService.getByUserId(currentUser.id);

      const items: any = await this.itemService.getBySubCategoryId(
        subCategoryId,
      );
      if (!forSale) {
        const forBuyingItems: any = items.filter((item: any) => item.forBuying);
        await this.itemsListHelper(
          bot,
          chatId,
          forBuyingItems,
          currentUser,
          cart,
        );
      }
      if (forSale) {
        const forSaleItems: any = items.filter(
          (item: any) => item.forSale && !item.sold,
        );
        await this.itemsListHelper(
          bot,
          chatId,
          forSaleItems,
          currentUser,
          cart,
        );
      }
      if (currentUser.admin) {
        await bot.sendMessage(
          chatId,
          `*****ТОВАРЫ КАТЕГОРИИ ${subCategory.title}*****`,
          mainAdminMenuKeyboard(chatId),
        );
      }
      if (!currentUser.admin) {
        await bot.sendMessage(
          chatId,
          `*****ТОВАРЫ КАТЕГОРИИ ${subCategory.title}*****`,
          mainUserMenuKeyboard(chatId),
        );
      } else {
        await bot.sendMessage(chatId, 'Товаров пока нет');
      }
    } catch (error) {
      await bot.sendMessage(chatId, 'Произошла непредвиденная ошибка');
    }
  }

  async itemsFilterList(bot: any, chatId: string, data: any): Promise<void> {
    try {
      const currentUser: any = await this.usersService.getByChatId(chatId);
      const cart: any = await this.cartService.getByUserId(currentUser.id);
      const items = await this.filterService.itemFilter(data, data.forSale);
      if (items.length > 0) {
        items.map(async (item: any) => {
          await bot.sendPhoto(chatId, item.image, {
            caption: `${item.forSale ? 'Цена' : 'Желаемая цена покупки'} - ${
              item.price
            }  ${item.unitOfMeasurement ? item.unitOfMeasurement : 'руб.'}
                        ${item.owner === chatId.toString() ? 'Ваш товар' : ''}
                        ${
                          cart.items?.includes(item)
                            ? 'Товар добавлен в избранное'
                            : ''
                        } 
                        `,
            parse_mode: 'markdown',
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [
                  {
                    text: `Подробнее`,
                    callback_data: `more_about_item_${item.id}`,
                  },
                ],

                [
                  {
                    text:
                      currentUser.admin || item.owner === chatId.toString()
                        ? `Изменить`
                        : '',
                    web_app: {
                      url: urls.update_item_form + `/${item.id}` + `/${chatId}`,
                    },
                  },
                ],
              ],
            }),
          });
        });
      } else {
        await bot.sendMessage(chatId, 'Товаров пока нет');
      }
    } catch (error) {}
  }

  async itemsFilter(bot: any, chatId: string, forSale: boolean): Promise<void> {
    const objectData: any = {
      title: '',
      city: 0,
      category: 0,
      subCategory: 0,
    };
    const currentUser: UserEntity = await this.usersService.getByChatId(
      chatId.toString(),
    );
    const cart: CartEntity = await this.cartService.getByUserId(currentUser.id);
    const categories: CategoryEntity[] = await this.categoryService.getAll();
    const subCategories: SubCategoryEntity[] =
      await this.subCategoryService.getAll();

    await bot
      .sendMessage(chatId, '*Выберите один из вариантов фильтрации товаров*', {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [
              {
                text: `Город/Подкатегория`,
                callback_data: `filter_by_city_and_subCategory`,
              },
            ],
            [
              {
                text: `Город/Категория`,
                callback_data: `filter_by_city_and_category`,
              },
            ],
            [
              {
                text: `Город/Название`,
                callback_data: `filter_by_city_and_title`,
              },
            ],
            [
              {
                text: `Подкатегория/Название`,
                callback_data: `filter_by_subCategory_and_title`,
              },
            ],
            [
              {
                text: `Категория/Название`,
                callback_data: `filter_by_category_and_title`,
              },
            ],

            [
              {
                text: `Категория/Название/Город`,
                callback_data: `filter_by_category_title_and_city`,
              },
            ],
            [
              {
                text: `Подкатегория/Название/Город`,
                callback_data: `filter_by_subCategory_title_and_city`,
              },
            ],
          ],
        }),
      })
      .then(async () => {
        await bot.on('callback_query', async (query: any) => {
          switch (true) {
            case !!this.commonService
              .callBackData(query)
              .match(/filter_by_city_and_subCategory/g):
              await bot
                .sendMessage(
                  this.commonService.queryChatId(query),
                  'Введите название города',
                )
                .then(async () => {
                  await bot.once('message', async (message: any) => {
                    const cities: CityEntity[] =
                      await this.citiesService.getByTitle(
                        this.commonService.messageText(message),
                      );
                    if (cities.length > 0) {
                      const cits = cities.map((city: any) => [
                        {
                          text: `${city.title}`,
                          callback_data: `filter_by_city_${city.id}`,
                        },
                      ]);
                      await bot
                        .sendMessage(chatId, 'Выберите город', {
                          reply_markup: JSON.stringify({
                            inline_keyboard: cits,
                          }),
                        })
                        .then(async () => {
                          await bot.once(
                            'callback_query',
                            async (query: any) => {
                              if (
                                !!this.commonService
                                  .callBackData(query)
                                  .match(/filter_by_city_\d/g)
                              ) {
                                objectData.city = +this.commonService
                                  .callBackData(query)
                                  .split('_')[3];
                                const subCategories: SubCategoryEntity[] =
                                  await this.subCategoryService.getAll();
                                const subCats = subCategories.map(
                                  (subCategory: any) => [
                                    {
                                      text: `${subCategory.title}`,
                                      callback_data: `filter_by_subCategory_${subCategory.id}`,
                                    },
                                  ],
                                );
                                await bot
                                  .sendMessage(
                                    chatId,
                                    'Выберите подкатегорию для покупки',
                                    {
                                      reply_markup: JSON.stringify({
                                        inline_keyboard: subCats,
                                      }),
                                    },
                                  )
                                  .then(async () => {
                                    await bot.once(
                                      'callback_query',
                                      async (query: any) => {
                                        if (
                                          !!this.commonService
                                            .callBackData(query)
                                            .match(/filter_by_subCategory_\d/g)
                                        ) {
                                          objectData.subCategory =
                                            +this.commonService
                                              .callBackData(query)
                                              .split('_')[3];
                                          const items: any =
                                            await this.filterService.itemFilter(
                                              objectData,
                                              forSale,
                                            );
                                          await this.itemsListHelper(
                                            bot,
                                            chatId,
                                            items,
                                            currentUser,
                                            cart,
                                          );
                                        }
                                      },
                                    );
                                  });
                              }
                            },
                          );
                        });
                    } else {
                      await bot.sendMessage(
                        this.commonService.queryChatId(query),
                        'Такого города пока нет',
                      );
                    }
                  });
                });
              return;

            case !!this.commonService
              .callBackData(query)
              .match(/filter_by_city_and_сategory/g):
              await bot
                .sendMessage(
                  this.commonService.queryChatId(query),
                  'Введите название города',
                )
                .then(async () => {
                  await bot.once('message', async (message: any) => {
                    const cities: CityEntity[] =
                      await this.citiesService.getByTitle(
                        this.commonService.messageText(message),
                      );
                    if (cities.length > 0) {
                      const cits = cities.map((city: any) => [
                        {
                          text: `${city.title}`,
                          callback_data: `filter_by_city_${city.id}`,
                        },
                      ]);
                      await bot
                        .sendMessage(chatId, 'Выберите город', {
                          reply_markup: JSON.stringify({
                            inline_keyboard: cits,
                          }),
                        })
                        .then(async () => {
                          await bot.once(
                            'callback_query',
                            async (query: any) => {
                              if (
                                !!this.commonService
                                  .callBackData(query)
                                  .match(/filter_by_city_\d/g)
                              ) {
                                objectData.city = +this.commonService
                                  .callBackData(query)
                                  .split('_')[3];
                                const categories: CategoryEntity[] =
                                  await this.categoryService.getAll();
                                const cats = categories.map((category: any) => [
                                  {
                                    text: `${category.title}`,
                                    callback_data: `filter_by_category_${category.id}`,
                                  },
                                ]);
                                await bot
                                  .sendMessage(
                                    chatId,
                                    'Выберите категорию для покупки',
                                    {
                                      reply_markup: JSON.stringify({
                                        inline_keyboard: cats,
                                      }),
                                    },
                                  )
                                  .then(async () => {
                                    await bot.once(
                                      'callback_query',
                                      async (query: any) => {
                                        if (
                                          !!this.commonService
                                            .callBackData(query)
                                            .match(/filter_by_category_\d/g)
                                        ) {
                                          objectData.category =
                                            +this.commonService
                                              .callBackData(query)
                                              .split('_')[3];
                                          const items: any =
                                            await this.filterService.itemFilter(
                                              objectData,
                                              forSale,
                                            );
                                          await this.itemsListHelper(
                                            bot,
                                            chatId,
                                            items,
                                            currentUser,
                                            cart,
                                          );
                                        }
                                      },
                                    );
                                  });
                              }
                            },
                          );
                        });
                    } else {
                      await bot.sendMessage(
                        this.commonService.queryChatId(query),
                        'Такого города пока нет',
                      );
                    }
                  });
                });
              return;

            case !!this.commonService
              .callBackData(query)
              .match(/filter_by_city_and_title/g):
              await bot
                .sendMessage(
                  this.commonService.queryChatId(query),
                  'Введите название города',
                )
                .then(async () => {
                  await bot.once('message', async (message: any) => {
                    const cities: CityEntity[] =
                      await this.citiesService.getByTitle(
                        this.commonService.messageText(message),
                      );
                    if (cities.length > 0) {
                      const cits = await cities.map((city: any) => [
                        {
                          text: `${city.title}`,
                          callback_data: `filter_by_city_${city.id}`,
                        },
                      ]);
                      await bot
                        .sendMessage(chatId, 'Выберите город', {
                          reply_markup: JSON.stringify({
                            inline_keyboard: cits,
                          }),
                        })
                        .then(async () => {
                          await bot.once(
                            'callback_query',
                            async (query: any) => {
                              if (
                                !!this.commonService
                                  .callBackData(query)
                                  .match(/filter_by_city_\d/g)
                              ) {
                                objectData.city = +this.commonService
                                  .callBackData(query)
                                  .split('_')[3];

                                await bot
                                  .sendMessage(
                                    chatId,
                                    'Введите название продукта',
                                  )
                                  .then(async () => {
                                    await bot.once(
                                      'message',
                                      async (message: any) => {
                                        objectData.title =
                                          await this.commonService.messageText(
                                            message,
                                          );
                                        const items: any =
                                          await this.filterService.itemFilter(
                                            objectData,
                                            forSale,
                                          );
                                        await this.itemsListHelper(
                                          bot,
                                          chatId,
                                          items,
                                          currentUser,
                                          cart,
                                        );
                                      },
                                    );
                                  });
                              }
                            },
                          );
                        });
                    } else {
                      await bot.sendMessage(
                        this.commonService.queryChatId(query),
                        'Такого города пока нет',
                      );
                    }
                  });
                });
              return;

            case !!this.commonService
              .callBackData(query)
              .match(/filter_by_subCategory_and_title/g):
              const subCategories: SubCategoryEntity[] =
                await this.subCategoryService.getAll();
              const subCats = subCategories.map((subCategory: any) => [
                {
                  text: `${subCategory.title}`,
                  callback_data: `filter_by_subCategory_${subCategory.id}`,
                },
              ]);
              await bot
                .sendMessage(chatId, 'Выберите подкатегорию', {
                  reply_markup: JSON.stringify({
                    inline_keyboard: subCats,
                  }),
                })
                .then(async () => {
                  await bot.once('callback_query', async (query: any) => {
                    if (
                      !!this.commonService
                        .callBackData(query)
                        .match(/filter_by_subCategory_\d/g)
                    ) {
                      objectData.subCategory = +this.commonService
                        .callBackData(query)
                        .split('_')[3];

                      await bot
                        .sendMessage(chatId, 'Введите название продукта')
                        .then(async () => {
                          await bot.once('message', async (message: any) => {
                            objectData.title =
                              await this.commonService.messageText(message);
                            const items: any =
                              await this.filterService.itemFilter(
                                objectData,
                                forSale,
                              );
                            await this.itemsListHelper(
                              bot,
                              chatId,
                              items,
                              currentUser,
                              cart,
                            );
                          });
                        });
                    }
                  });
                });
              return;

            case !!this.commonService
              .callBackData(query)
              .match(/filter_by_category_and_title/g):
              const categories: CategoryEntity[] =
                await this.categoryService.getAll();
              const cats = categories.map((category: any) => [
                {
                  text: `${category.title}`,
                  callback_data: `filter_by_category_${category.id}`,
                },
              ]);
              await bot
                .sendMessage(chatId, 'Выберите категорию', {
                  reply_markup: JSON.stringify({
                    inline_keyboard: cats,
                  }),
                })
                .then(async () => {
                  await bot.once('callback_query', async (query: any) => {
                    if (
                      !!this.commonService
                        .callBackData(query)
                        .match(/filter_by_category_\d/g)
                    ) {
                      objectData.category = +this.commonService
                        .callBackData(query)
                        .split('_')[3];

                      await bot
                        .sendMessage(chatId, 'Введите название продукта')
                        .then(async () => {
                          await bot.once('message', async (message: any) => {
                            objectData.title =
                              await this.commonService.messageText(message);
                            const items: any =
                              await this.filterService.itemFilter(
                                objectData,
                                forSale,
                              );
                            await this.itemsListHelper(
                              bot,
                              chatId,
                              items,
                              currentUser,
                              cart,
                            );
                          });
                        });
                    }
                  });
                });
              return;

            case !!this.commonService
              .callBackData(query)
              .match(/filter_by_category_title_and_city/g):
              const categories_1: CategoryEntity[] =
                await this.categoryService.getAll();
              const cats_1 = categories_1.map((category: any) => [
                {
                  text: `${category.title}`,
                  callback_data: `filter_by_category_${category.id}`,
                },
              ]);
              await bot
                .sendMessage(chatId, 'Выберите категорию', {
                  reply_markup: JSON.stringify({
                    inline_keyboard: cats_1,
                  }),
                })
                .then(async () => {
                  await bot.once('callback_query', async (query: any) => {
                    if (
                      !!this.commonService
                        .callBackData(query)
                        .match(/filter_by_category_\d/g)
                    ) {
                      objectData.category = +this.commonService
                        .callBackData(query)
                        .split('_')[3];

                      await bot
                        .sendMessage(chatId, 'Введите название продукта')
                        .then(async () => {
                          await bot.once('message', async (message: any) => {
                            objectData.title =
                              await this.commonService.messageText(message);

                            const cities: CityEntity[] =
                              await this.citiesService.getByTitle(
                                this.commonService.messageText(message),
                              );
                            if (cities.length > 0) {
                              const cits = await cities.map((city: any) => [
                                {
                                  text: `${city.title}`,
                                  callback_data: `filter_by_city_${city.id}`,
                                },
                              ]);
                              await bot
                                .sendMessage(chatId, 'Выберите город', {
                                  reply_markup: JSON.stringify({
                                    inline_keyboard: cits,
                                  }),
                                })
                                .then(async () => {
                                  await bot.once(
                                    'callback_query',
                                    async (query: any) => {
                                      if (
                                        !!this.commonService
                                          .callBackData(query)
                                          .match(/filter_by_city_\d/g)
                                      ) {
                                        objectData.city = +this.commonService
                                          .callBackData(query)
                                          .split('_')[3];
                                        const items: any =
                                          await this.filterService.itemFilter(
                                            objectData,
                                            forSale,
                                          );
                                        await this.itemsListHelper(
                                          bot,
                                          chatId,
                                          items,
                                          currentUser,
                                          cart,
                                        );
                                      }
                                    },
                                  );
                                });
                            }
                          });
                        });
                    }
                  });
                });
              return;

            case !!this.commonService
              .callBackData(query)
              .match(/filter_by_subCategory_title_and_city/g):
              const subCategories_1: CategoryEntity[] =
                await this.categoryService.getAll();
              const subCats_1 = subCategories_1.map((subCategory: any) => [
                {
                  text: `${subCategory.title}`,
                  callback_data: `filter_by_subCategory_${subCategory.id}`,
                },
              ]);
              await bot
                .sendMessage(chatId, 'Выберите подкатегорию', {
                  reply_markup: JSON.stringify({
                    inline_keyboard: subCats_1,
                  }),
                })
                .then(async () => {
                  await bot.once('callback_query', async (query: any) => {
                    if (
                      !!this.commonService
                        .callBackData(query)
                        .match(/filter_by_subCategory_\d/g)
                    ) {
                      objectData.subCategory = +this.commonService
                        .callBackData(query)
                        .split('_')[3];

                      await bot
                        .sendMessage(chatId, 'Введите название продукта')
                        .then(async () => {
                          await bot.once('message', async (message: any) => {
                            objectData.title =
                              await this.commonService.messageText(message);

                            const cities: CityEntity[] =
                              await this.citiesService.getByTitle(
                                this.commonService.messageText(message),
                              );
                            if (cities.length > 0) {
                              const cits = await cities.map((city: any) => [
                                {
                                  text: `${city.title}`,
                                  callback_data: `filter_by_city_${city.id}`,
                                },
                              ]);
                              await bot
                                .sendMessage(chatId, 'Выберите город', {
                                  reply_markup: JSON.stringify({
                                    inline_keyboard: cits,
                                  }),
                                })
                                .then(async () => {
                                  await bot.once(
                                    'callback_query',
                                    async (query: any) => {
                                      if (
                                        !!this.commonService
                                          .callBackData(query)
                                          .match(/filter_by_city_\d/g)
                                      ) {
                                        objectData.city = +this.commonService
                                          .callBackData(query)
                                          .split('_')[3];
                                        const items: any =
                                          await this.filterService.itemFilter(
                                            objectData,
                                            forSale,
                                          );
                                        await this.itemsListHelper(
                                          bot,
                                          chatId,
                                          items,
                                          currentUser,
                                          cart,
                                        );
                                      }
                                    },
                                  );
                                });
                            }
                          });
                        });
                    }
                  });
                });
              return;
          }
        });
      });
  }
}
