import { registrationButtons } from '@app/common/buttons/registration.buttons';
import { registrationCallback } from '@app/common/callbacks/registration.callback';

export const registrationMenuKeyboard: any = {
  /*reply_markup : JSON.stringify({
        inline_keyboard: [
            [{text: registrationButtons.registration, callback_data: registrationCallback.registration}]
        ],
        one_time_keyboard: true
        })*/
  reply_markup: {
    keyboard: [
      [
        {
          text: registrationButtons.registration,
          callback_data: registrationCallback.registration,
        },
      ],
    ],
    resize_keyboard: true,
  },
};
