import { adminButtons } from '@app/common/buttons/admin.buttons';
import { adminCallback } from '@app/common/callbacks/admin.callback';

export const cartsAdminMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      [
        {
          text: adminButtons.carts.cancel,
          callback_data: adminCallback.carts.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
