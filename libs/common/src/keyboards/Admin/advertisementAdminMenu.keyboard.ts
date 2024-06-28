import {adminButtons} from "@app/common/buttons/admin.buttons";
import {adminCallback} from "@app/common/callbacks/admin.callback";
import {urls} from "@app/common/appUrls/app.urls";

export const advertisementAdminMenuKeyboard = async (chatId: string) => {
    return {

        reply_markup: {
            keyboard: [
                [{
                    text: adminButtons.advertisement.createAdvertisement,
                    web_app: {url: urls.create_new_advertisement_form + `/${chatId}`}
                }],
                [{
                    text: adminButtons.advertisement.updateAdvertisement,
                    callback_data: adminCallback.advertisement.updateAdvertisement
                }],
                [{
                    text: adminButtons.advertisement.deleteAdvertisement,
                    callback_data: adminCallback.advertisement.deleteAdvertisement
                }],
                [{text: adminButtons.advertisement.cancel, callback_data: adminCallback.advertisement.cancel}]
            ],
            resize_keyboard: true

        }

    }
}
