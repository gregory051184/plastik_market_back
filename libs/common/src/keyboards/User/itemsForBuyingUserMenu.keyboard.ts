import { userButtons } from '@app/common/buttons/user.buttons';
import { userCallback } from '@app/common/callbacks/user.callback';

export const itemsForBuyingUserMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      //[{text: 'ОТМЕНИТЬ ВСЕ ДЕЙСТВИЯ', callback_data: 'отменить_все_действия_и_вернуться_в_главное_меню'}],
      //[{text: userButtons.buyItems.itemsFilter, callback_data: userCallback.buyItems.itemsFilter}],
      //[{text: userButtons.buyItems.itemCategories, callback_data: userCallback.buyItems.itemCategories}],
      [
        {
          text: userButtons.categories.getItemsByCategoryForBuying,
          callback_data: userCallback.categories.getItemsByCategoryForBuying,
        },
      ],
      [
        {
          text: userButtons.subCategories.getItemsBySubCategoryForBuying,
          callback_data:
            userCallback.subCategories.getItemsBySubCategoryForBuying,
        },
      ],

      [
        {
          text: userButtons.cities.getItemsByCityForBuying,
          callback_data: userCallback.cities.getItemsByCityForBuying,
        },
      ],
      //[{text: userButtons.buyItems.getItemsByPrice, callback_data: userCallback.buyItems.getItemsByPrice}],
      [
        {
          text: userButtons.buyItems.cancel,
          callback_data: userCallback.buyItems.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
