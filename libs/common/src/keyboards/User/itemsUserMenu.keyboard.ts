import {userButtons} from "@app/common/buttons/user.buttons";
import {userCallback} from "@app/common/callbacks/user.callback";

export const itemsUserMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: userButtons.items.buyItem, callback_data: userCallback.items.buyItem}],
            [{text: userButtons.items.saleItem, callback_data: userCallback.items.saleItem}],
            [{text: userButtons.items.cancel, callback_data: userCallback.items.cancel}]
        ],
        resize_keyboard: true
    }
}