import { userButtons, userCallback } from '@app/common';

export const profileUserMenuKeyboard = async (userId: number) => {
  return {
    reply_markup: {
      keyboard: [
        [
          {
            text: userButtons.mainMenu.cart,
            callback_data: userCallback.mainMenu.cart,
          },
        ],
        [
          {
            text: userButtons.items.myItems,
            callback_data: userCallback.items.myItems,
          },
        ],
        [
          {
            text: userButtons.profile.mySoldItems,
            callback_data: userCallback.profile.mySoldItems,
          },
        ],
        [
          {
            text: userButtons.profile.subscribe,
            callback_data: userCallback.profile.subscribe,
          },
        ],
        [
          {
            text: userButtons.profile.changeProfile,
            web_app: {
              url: `https://e213-5-164-188-201.ngrok-free.app/update/user/${userId}`,
            },
          },
        ],
        [
          {
            text: userButtons.profile.cancel,
            callback_data: userCallback.profile.cancel,
          },
        ],
      ],
      resize_keyboard: true,
    },
  };
};

/*export const profileUserMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: userButtons.mainMenu.cart, callback_data: userCallback.mainMenu.cart}],
            [{text: userButtons.items.myItems, callback_data: userCallback.items.myItems}],
            [{text: userButtons.profile.subscribe, callback_data: userCallback.profile.subscribe}],
            [{
                text: userButtons.profile.changeProfile,
                web_app: {url: 'https://9651-5-164-188-201.ngrok-free.app/update/user'}
            }],
            [{text: userButtons.profile.cancel, callback_data: userCallback.profile.cancel}]
        ],
        resize_keyboard: true
    }
}*/
