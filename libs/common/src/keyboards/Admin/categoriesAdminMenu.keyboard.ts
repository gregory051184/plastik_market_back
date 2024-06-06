import { adminButtons } from '@app/common/buttons/admin.buttons';
import { adminCallback } from '@app/common/callbacks/admin.callback';
import { urls } from '@app/common/appUrls/app.urls';

export const categoriesAdminMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      [
        {
          text: adminButtons.categories.createCategory,
          web_app: { url: urls.create_new_category_form },
        },
      ],
      [
        {
          text: adminButtons.categories.updateCategory,
          callback_data: adminCallback.categories.updateCategory,
        },
      ],
      [
        {
          text: adminButtons.categories.deleteCategory,
          callback_data: adminCallback.categories.deleteCategory,
        },
      ],
      [
        {
          text: adminButtons.categories.cancel,
          callback_data: adminCallback.categories.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
