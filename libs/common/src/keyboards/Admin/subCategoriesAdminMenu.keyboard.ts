import {adminButtons, adminCallback, urls} from "@app/common";

export const subCategoriesAdminMenuKeyboard = async (chatId: string) => {
    return {
        reply_markup: {
            keyboard: [
                [{
                    text: adminButtons.subCategories.createSubCategory,
                    web_app: {url: `https://70b6-5-164-183-17.ngrok-free.app/create/subcategory/${chatId}`}
                }],

                //[{text: adminButtons.subCategories.createSubCategory, web_app: {url: urls.create_new_subcategory_form}}],
                [{
                    text: adminButtons.subCategories.updateSubCategory,
                    callback_data: adminCallback.subCategories.updateSubCategory
                }],
                [{
                    text: adminButtons.subCategories.getItemsBySubCategoryForBuying,
                    callback_data: adminCallback.subCategories.getItemsBySubCategoryForBuying
                }],
                [{
                    text: adminButtons.subCategories.getItemsBySubCategoryForSale,
                    callback_data: adminCallback.subCategories.getItemsBySubCategoryForSale
                }],
                [{
                    text: adminButtons.subCategories.deleteSubCategory,
                    callback_data: adminCallback.subCategories.deleteSubCategory
                }],
                [{text: adminButtons.subCategories.cancel, callback_data: adminCallback.subCategories.cancel}]
            ],
            resize_keyboard: true
        }
    }
}