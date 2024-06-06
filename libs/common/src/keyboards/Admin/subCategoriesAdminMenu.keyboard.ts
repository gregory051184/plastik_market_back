import { adminButtons, adminCallback } from '@app/common';

export const subCategoriesAdminMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      [
        {
          text: adminButtons.subCategories.createSubCategory,
          web_app: {
            url: 'https://bf37-5-164-188-201.ngrok-free.app/create/subcategory',
          },
        },
      ],
      [
        {
          text: adminButtons.subCategories.updateSubCategory,
          callback_data: adminCallback.subCategories.updateSubCategory,
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
          text: adminButtons.subCategories.getItemsBySubCategoryForSale,
          callback_data:
            adminCallback.subCategories.getItemsBySubCategoryForSale,
        },
      ],
      [
        {
          text: adminButtons.subCategories.deleteSubCategory,
          callback_data: adminCallback.subCategories.deleteSubCategory,
        },
      ],
      [
        {
          text: adminButtons.subCategories.cancel,
          callback_data: adminCallback.subCategories.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
