import { adminButtons } from '@app/common/buttons/admin.buttons';
import { adminCallback } from '@app/common/callbacks/admin.callback';

export const itemsForBuyingAdminMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      //[{text: adminButtons.buyItems.itemsFilter, callback_data: adminCallback.buyItems.itemsFilter}],
      [
        {
          text: adminButtons.categories.getItemsByCategoryForBuying,
          callback_data: adminCallback.categories.getItemsByCategoryForBuying,
        },
      ],
      [
        {
          text: adminButtons.subCategories.getItemsBySubCategoryForBuying,
          callback_data:
            adminCallback.subCategories.getItemsBySubCategoryForBuying,
        },
      ],
      [
        {
          text: adminButtons.buyItems.itemCities,
          callback_data: adminCallback.buyItems.itemCities,
        },
      ],
      [
        {
          text: adminButtons.buyItems.itemCategories,
          callback_data: adminCallback.buyItems.itemCategories,
        },
      ],
      [
        {
          text: adminButtons.cities.getItemsByCityForBuying,
          callback_data: adminCallback.cities.getItemsByCityForBuying,
        },
      ],
      [
        {
          text: adminButtons.buyItems.findByTitle,
          callback_data: adminCallback.buyItems.findByTitle,
        },
      ],
      [
        {
          text: adminButtons.buyItems.getItemsByPrice,
          callback_data: adminCallback.buyItems.getItemsByPrice,
        },
      ],
      [
        {
          text: adminButtons.buyItems.cancel,
          callback_data: adminCallback.buyItems.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
