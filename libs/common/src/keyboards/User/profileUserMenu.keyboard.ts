import {urls, userButtons, userCallback} from "@app/common";

export const profileUserMenuKeyboard = async (userId: number) => {
    return {
        reply_markup: {
            keyboard: [
                [{text: userButtons.mainMenu.cart, callback_data: userCallback.mainMenu.cart}],
                [{text: userButtons.items.myItems, callback_data: userCallback.items.myItems}],
                [{text: userButtons.profile.mySoldItems, callback_data: userCallback.profile.mySoldItems}],
                [{text: userButtons.profile.subscribe, callback_data: userCallback.profile.subscribe}],
                [{
                    text: userButtons.profile.changeProfile,
                    web_app: {url: `https://70b6-5-164-183-17.ngrok-free.app/update/user/${userId}`}
                }],
                /*[{
                    text: userButtons.profile.changeProfile,
                    web_app: {url: urls.update_profile_form + `/${userId}`}
                }],*/
                [{text: userButtons.profile.cancel, callback_data: userCallback.profile.cancel}]
            ],
            resize_keyboard: true
        }
    }
}

