import { userButtons } from '@app/common/buttons/user.buttons';
import { userCallback } from '@app/common/callbacks/user.callback';

export const itemsForSaleUserMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      //[{text: userButtons.saleItems.itemsFilter, callback_data: userCallback.saleItems.itemsFilter}],
      [
        {
          text: userButtons.categories.getItemsByCategoryForSale,
          callback_data: userCallback.categories.getItemsByCategoryForSale,
        },
      ],
      [
        {
          text: userButtons.subCategories.getItemsBySubCategoryForSale,
          callback_data:
            userCallback.subCategories.getItemsBySubCategoryForSale,
        },
      ],
      [
        {
          text: userButtons.cities.getItemsByCityForSale,
          callback_data: userCallback.cities.getItemsByCityForSale,
        },
      ],
      [
        {
          text: userButtons.saleItems.cancel,
          callback_data: userCallback.saleItems.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
