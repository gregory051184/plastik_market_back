import {userButtons} from "@app/common/buttons/user.buttons";
import {userCallback} from "@app/common/callbacks/user.callback";

export const citiesUserMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: userButtons.cities.cancel, callback_data: userCallback.cities.cancel}]
        ],
        resize_keyboard: true
    }
}