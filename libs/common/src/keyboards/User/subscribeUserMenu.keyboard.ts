import { userButtons, userCallback } from '@app/common';

export const subscribeUserMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      [
        {
          text: userButtons.subscribes.cancel,
          callback_data: userCallback.subscribes.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
