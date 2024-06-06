import { userButtons } from '@app/common/buttons/user.buttons';
import { userCallback } from '@app/common/callbacks/user.callback';
import { urls } from '@app/common/appUrls/app.urls';

export const mainUserMenuKeyboard = async (chatId: string) => {
  return {
    reply_markup: {
      keyboard: [
        [
          {
            text: userButtons.mainMenu.createItem,
            web_app: { url: urls.create_new_item_form + `/${chatId}` },
          },
        ],
        //[{text: userButtons.mainMenu.itemsFilter, web_app: {url: urls.items_filter}}],
        [
          {
            text: userButtons.mainMenu.itemsFilter,
            callback_data: userCallback.mainMenu.itemsFilter,
          },
        ],
        [
          {
            text: userButtons.items.buyItem,
            callback_data: userCallback.items.buyItem,
          },
        ],
        [
          {
            text: userButtons.items.saleItem,
            callback_data: userCallback.items.saleItem,
          },
        ],
        [
          {
            text: userButtons.mainMenu.myProfile,
            callback_data: userCallback.mainMenu.myProfile,
          },
        ],
      ],
      resize_keyboard: true,
    },
  };
};

/*export const mainUserMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: userButtons.mainMenu.createItem, web_app: {url: urls.create_new_item_form}}],
            [{text: userButtons.items.buyItem, callback_data: userCallback.items.buyItem}],
            [{text: userButtons.items.saleItem, callback_data: userCallback.items.saleItem}],
            [{text: userButtons.mainMenu.myProfile, callback_data: userCallback.mainMenu.myProfile}]
        ],
        resize_keyboard: true
    }
}*/
