import { adminButtons, adminCallback, urls } from '@app/common';

export const subscribeAdminMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      [
        {
          text: adminButtons.subscribes.createSubscribe,
          web_app: {
            url: 'https://bf37-5-164-188-201.ngrok-free.app/create/subscribe',
          },
        },
      ],
      [
        {
          text: adminButtons.subscribes.updateSubscribe,
          callback_data: adminCallback.subscribes.updateSubscribe,
        },
      ],
      [
        {
          text: adminButtons.subscribes.deleteSubscribe,
          callback_data: adminCallback.subscribes.deleteSubscribe,
        },
      ],
      [
        {
          text: adminButtons.subscribes.cancel,
          callback_data: adminCallback.subscribes.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
