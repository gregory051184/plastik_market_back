import {userButtons} from "@app/common/buttons/user.buttons";
import {userCallback} from "@app/common/callbacks/user.callback";

export const categoriesUserMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: userButtons.categories.cancel, callback_data: userCallback.categories.cancel}]
        ],
        resize_keyboard: true
    }
}