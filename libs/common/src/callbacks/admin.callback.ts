export const adminCallback = {
  mainMenu: {
    createItem: 'создать_товар_админ',
    itemsFilter: 'расширенный_поиск_товаров_по_нескольким_параметрам_админ',
    itemSubCategories: 'подкатегории_товаров_админ',
    users: 'пользователи_админ',
    items: 'товары_админ',
    advertisement: 'реклама_админ',
    cart: 'избранное_админ',
    subscribe: 'подписки_админ',
  },
  items: {
    myItems: 'только_мои_товары_админ',
    buyItem: 'товары_для_покупки_админ',
    saleItem: 'товары_для_продажи_админ',
    cancel: 'вернуться_в_главное_меню_из_меню_товаров_админ',
    delete: 'удалить_данный_товар_админ',
  },
  buyItems: {
    itemCategories: 'товары_для_покупки_сортированные_по_категориям_админ',
    //itemSubCategories: 'товары_для_покупки_сортированные_по_подкатегориям_админ',
    //itemsFilter: 'расширенный_поиск_товаров_для_покупки_по_нескольким_параметрам_админ',
    itemCities: 'товары_для_покупки_сортированные_по_городам_админ',
    itemsByChatId:
      'товары_для_покупки_сортированные_по_имени_пользователя_админ',
    findByTitle: 'найти_товар_для_покупки_по_названию_админ',
    getItemsByPrice: 'найти_товар_для_покупки_по_ценам_админ',
    cancel: 'вернуться_в_меню_товаров_из_меню_товаров_для_покупки_пользователь',
    delete: 'удалить_товар_для_покупки_админ',
  },
  saleItems: {
    itemCategories: 'товары_для_продажи_сортированные_по_категориям_админ',
    //itemSubCategories: 'товары_для_продажи_сортированные_по_подкатегориям_админ',
    //itemsFilter: 'расширенный_поиск_товаров_для_продажи_по_нескольким_параметрам_админ',
    itemCities: 'товары_для_продажи_сортированные_по_городам_админ',
    itemsByUserChatId:
      'товары_для_продажи_сортированные_по_имени_пользователя_админ',
    findByTitle: 'найти_товар_для_продажи_по_названию_админ',
    getItemsByPrice: 'найти_товар_для_продажи_по_ценам_админ',
    cancel: 'вернуться_в_меню_товаров_из_меню_товаров_для_продажи_пользователь',
    delete: 'удалить_товар_для_продажи_админ',
  },
  categories: {
    createCategory: 'создать_категорию_товаров_админ',
    getItemsByCategoryForSale: 'найти_товар_для_продажи_по_категории_админ',
    getItemsByCategoryForBuying: 'найти_товар_для_покупки_по_категории_админ',
    updateCategory: 'список_категорий_для_изменения_админ',
    deleteCategory: 'список_категорий_для_удаления_админ',
    cancel: 'вернуться_в_главное_меню_из_меню_категорий_админ',
    itemCategory: 'данная_категория_товаров_админ',
  },
  users: {
    createAdmin: 'создать_админа_админ',
    findByChatId: 'найти_пользователя_по_chatId_админ',
    findByFirstName: 'найти_пользователей_по_имени_админ',
    findByUsername: 'найти_пользователей_по_имени_пользователя_админ',
    findAdmins: 'найти_всех_админов_админ',
    banned: 'забанить_данного_пользователя_админ',
    delete: 'удалить_пользователя_админ',
    return: 'вернуться_в_главное_меню_из_меню_пользователей_админ',
  },

  cities: {
    getItemsByCityForSale: 'найти_товар_для_продажи_по_городу_админ',
    getItemsByCityForBuying: 'найти_товар_для_покупки_по_городу_админ',
    createCity: 'добавить_город_админ',
    updateCity: 'список_городов_для_изменения_админ',
    deleteCity: 'список_городов_для_удаления_админ',
    cancel: 'вернуться_в_меню_товаров_из_меню_городов_админ',
  },

  carts: {
    addToFavorites: 'добавить_товар_в_избранное_админ',
    deleteFromCart: 'удалить_товар_из_корзины_админ',
    getCartByUserId: 'проверить_корзину_по_id_пользователя_админ',
    cancel: '<<_вернуться_в_главное_меню_из_меню_избранного_админ',
  },

  advertisement: {
    createAdvertisement: 'создать_рекламное_предложение_админ',
    updateAdvertisement: 'список_рекламных_блоков_для_редактирования_админ',
    deleteAdvertisement: 'список_рекламных_блоков_для_удаления_админ',
    cancel: '<<_вернуться_в_главное_меню_из_меню_рекламы_админ',
  },

  subCategories: {
    createSubCategory: 'создать_подкатегорию_товаров_админ',
    getItemsBySubCategoryForSale:
      'найти_товар_по_подкатегории_для_продажи_админ',
    getItemsBySubCategoryForBuying:
      'найти_товар_по_подкатегории_для_покупки_админ',
    updateSubCategory: 'список_подкатегорий_для_редактирования_админ',
    deleteSubCategory: 'список_подкатегорий_для_удаления_админ',
    cancel: '<<_вернуться_в_меню_товаров_из_меню_подкатегорий_админ',
  },

  subscribes: {
    createSubscribe: 'создать_подписку_админ',
    getAllSubscribes: 'получить_все_подписки_админ',
    updateSubscribe: 'список_подписок_для_редактирования_админ',
    deleteSubscribe: 'список_подписок_для_удаления_админ',
    cancel: '<<_вернуться_в_главное_меню_из_меню_подписок_админ',
  },

  itemsFilers: {
    forBuying: 'для_покупки_админ',
    forSale: 'для_продажи_админ',
    cancel: '<<_вернуться_в_главное_меню_из_меню_расширенного_поиска_админ',
  },
};