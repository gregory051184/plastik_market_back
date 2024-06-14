import {adminButtons} from "@app/common/buttons/admin.buttons";
import {adminCallback} from "@app/common/callbacks/admin.callback";
import {userButtons} from "@app/common/buttons/user.buttons";
import {userCallback} from "@app/common/callbacks/user.callback";

export const subCategoriesUserMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{
                text: userButtons.subCategories.getItemsBySubCategoryForBuying,
                callback_data: userCallback.subCategories.getItemsBySubCategoryForBuying
            }],
            [{
                text: userButtons.subCategories.getItemsBySubCategoryForSale,
                callback_data: userCallback.subCategories.getItemsBySubCategoryForSale
            }],
            [{text: userButtons.subCategories.cancel, callback_data: userCallback.subCategories.cancel}]
        ],
        resize_keyboard: true
    }
}