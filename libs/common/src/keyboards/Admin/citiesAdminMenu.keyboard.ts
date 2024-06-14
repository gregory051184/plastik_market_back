import {adminButtons} from "@app/common/buttons/admin.buttons";
import {adminCallback} from "@app/common/callbacks/admin.callback";
import {urls} from "@app/common/appUrls/app.urls";

export const citiesAdminMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: adminButtons.cities.createCity, web_app: {url: urls.create_new_city_form}}],
            [{text: adminButtons.cities.updateCity, callback_data: adminCallback.cities.updateCity}],
            [{text: adminButtons.cities.deleteCity, callback_data: adminCallback.cities.deleteCity}],
            [{text: adminButtons.cities.cancel, callback_data: adminCallback.cities.cancel}]
        ],
        resize_keyboard: true
    }
}