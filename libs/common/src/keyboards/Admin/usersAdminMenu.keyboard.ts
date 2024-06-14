import {adminButtons} from "@app/common/buttons/admin.buttons";
import {adminCallback} from "@app/common/callbacks/admin.callback";

export const usersAdminMenuKeyboard: any = {
    reply_markup: {
        keyboard: [
            [{text: adminButtons.users.createAdmin, callback_data: adminCallback.users.createAdmin}],
            [{text: adminButtons.users.findByUsername, callback_data: adminCallback.users.findByUsername}],
            [{text: adminButtons.users.findAdmins, callback_data: adminCallback.users.findAdmins}],
            [{text: adminButtons.users.findByFirstName, callback_data: adminCallback.users.findByFirstName}],
            [{text: adminButtons.users.return, callback_data: adminCallback.users.return}],
        ],
        resize_keyboard: true
    }
}