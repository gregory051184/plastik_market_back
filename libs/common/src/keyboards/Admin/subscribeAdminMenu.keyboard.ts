import {adminButtons, adminCallback, urls} from "@app/common";

export const subscribeAdminMenuKeyboard = async (chatId: string) => {
    return {
        reply_markup: {
            keyboard: [
                [{
                    text: adminButtons.subscribes.createSubscribe,
                    web_app: {url: `https://70b6-5-164-183-17.ngrok-free.app/create/subscribe/${chatId}`}
                }],
                //[{text: adminButtons.subscribes.createSubscribe, web_app: {url: urls.create_new_subscribe_form}}],
                [{
                    text: adminButtons.subscribes.updateSubscribe,
                    callback_data: adminCallback.subscribes.updateSubscribe
                }],
                [{
                    text: adminButtons.subscribes.deleteSubscribe,
                    callback_data: adminCallback.subscribes.deleteSubscribe
                }],
                [{text: adminButtons.subscribes.cancel, callback_data: adminCallback.subscribes.cancel}]
            ],
            resize_keyboard: true
        }
    }
}