const NotificationModel = require("../model/notification.model")
class NotificationController
{
    static async readNotificationController(code_usuario)
    {
        return await NotificationModel.readNotificationModel(code_usuario)
    }
}

module.exports = NotificationController