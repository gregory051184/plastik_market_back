import {adminButtons, adminCallback} from "@app/common";

export const itemsFilterAdminMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{
                text: adminButtons.itemsFilers.forSale,
                callback_data: adminCallback.itemsFilers.forSale
            }],
            [{
                text: adminButtons.itemsFilers.forBuying,
                callback_data: adminCallback.itemsFilers.forBuying
            }],
            [{
                text: adminButtons.itemsFilers.cancel,
                callback_data: adminCallback.itemsFilers.cancel
            }]
        ],
        resize_keyboard: true
    }
}