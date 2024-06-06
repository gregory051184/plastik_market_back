import { adminButtons } from '@app/common/buttons/admin.buttons';
import { adminCallback } from '@app/common/callbacks/admin.callback';

export const itemsAdminMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      [
        {
          text: adminButtons.items.myItems,
          callback_data: adminCallback.items.myItems,
        },
      ],
      [
        {
          text: adminButtons.items.buyItem,
          callback_data: adminCallback.items.buyItem,
        },
      ],
      [
        {
          text: adminButtons.items.saleItem,
          callback_data: adminCallback.items.saleItem,
        },
      ],
      [
        {
          text: adminButtons.items.cancel,
          callback_data: adminCallback.items.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
