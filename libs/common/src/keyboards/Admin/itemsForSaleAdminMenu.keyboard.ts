import { adminButtons } from '@app/common/buttons/admin.buttons';
import { adminCallback } from '@app/common/callbacks/admin.callback';

export const itemsForSaleAdminMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      //[{text: adminButtons.saleItems.itemsFilter, callback_data: adminCallback.saleItems.itemsFilter}],
      [
        {
          text: adminButtons.categories.getItemsByCategoryForSale,
          callback_data: adminCallback.categories.getItemsByCategoryForSale,
        },
      ],
      [
        {
          text: adminButtons.subCategories.getItemsBySubCategoryForSale,
          callback_data:
            adminCallback.subCategories.getItemsBySubCategoryForSale,
        },
      ],
      [
        {
          text: adminButtons.saleItems.itemCities,
          callback_data: adminCallback.saleItems.itemCities,
        },
      ],
      [
        {
          text: adminButtons.saleItems.itemCategories,
          callback_data: adminCallback.saleItems.itemCategories,
        },
      ],
      [
        {
          text: adminButtons.cities.getItemsByCityForSale,
          callback_data: adminCallback.cities.getItemsByCityForSale,
        },
      ],
      [
        {
          text: adminButtons.saleItems.findByTitle,
          callback_data: adminCallback.saleItems.findByTitle,
        },
      ],
      [
        {
          text: adminButtons.saleItems.getItemsByPrice,
          callback_data: adminCallback.saleItems.getItemsByPrice,
        },
      ],
      [
        {
          text: adminButtons.saleItems.cancel,
          callback_data: adminCallback.saleItems.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
