import { adminButtons } from '@app/common/buttons/admin.buttons';
import { adminCallback } from '@app/common/callbacks/admin.callback';
import { urls } from '@app/common/appUrls/app.urls';

export const mainAdminMenuKeyboard = async (chatId: string) => {
  return {
    reply_markup: {
      keyboard: [
        [
          {
            text: adminButtons.mainMenu.createItem,
            web_app: { url: urls.create_new_item_form + `/${chatId}` },
          },
        ],
        //[{text: adminButtons.mainMenu.itemsFilter, web_app: {url: urls.items_filter}}]
        [
          {
            text: adminButtons.mainMenu.itemSubCategories,
            callback_data: adminCallback.mainMenu.itemSubCategories,
          },
        ],
        [
          {
            text: adminButtons.mainMenu.itemsFilter,
            callback_data: adminCallback.mainMenu.itemsFilter,
          },
        ],
        [
          {
            text: adminButtons.mainMenu.users,
            callback_data: adminCallback.mainMenu.users,
          },
        ],
        [
          {
            text: adminButtons.mainMenu.items,
            callback_data: adminCallback.mainMenu.items,
          },
        ],
        [
          {
            text: adminButtons.mainMenu.cart,
            callback_data: adminCallback.mainMenu.cart,
          },
        ],
        [
          {
            text: adminButtons.mainMenu.advertisement,
            callback_data: adminCallback.mainMenu.advertisement,
          },
        ],
        [
          {
            text: adminButtons.mainMenu.subscribe,
            callback_data: adminCallback.mainMenu.subscribe,
          },
        ],
      ],
      resize_keyboard: true,
    },
  };
};
/*export const mainAdminMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: adminButtons.mainMenu.createItem, web_app: {url: urls.create_new_item_form}}],
            [{text: adminButtons.mainMenu.users, callback_data: adminCallback.mainMenu.users}],
            [{text: adminButtons.mainMenu.items, callback_data: adminCallback.mainMenu.items}],
            [{text: adminButtons.mainMenu.cart, callback_data: adminCallback.mainMenu.cart}],
            [{text: adminButtons.mainMenu.advertisement, callback_data: adminCallback.mainMenu.advertisement}]
        ],
        resize_keyboard: true
    }
}*/
