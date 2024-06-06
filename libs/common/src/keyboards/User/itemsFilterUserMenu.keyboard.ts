import { userButtons, userCallback } from '@app/common';

export const itemsFilterUserMenuKeyboard: any = {
  reply_markup: {
    keyboard: [
      [
        {
          text: userButtons.itemsFilers.forSale,
          callback_data: userCallback.itemsFilers.forSale,
        },
      ],
      [
        {
          text: userButtons.itemsFilers.forBuying,
          callback_data: userCallback.itemsFilers.forBuying,
        },
      ],
      [
        {
          text: userButtons.itemsFilers.cancel,
          callback_data: userCallback.itemsFilers.cancel,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
