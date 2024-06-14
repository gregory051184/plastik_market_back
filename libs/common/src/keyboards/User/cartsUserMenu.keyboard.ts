import {userButtons} from "@app/common/buttons/user.buttons";
import {userCallback} from "@app/common/callbacks/user.callback";

export const cartsUserMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{
                text: userButtons.carts.deleteAllItemsFromCart,
                callback_data: userCallback.carts.deleteAllItemsFromCart
            }],
            [{text: userButtons.carts.cancel, callback_data: userCallback.carts.cancel}]
        ],
        resize_keyboard: true
    }
}