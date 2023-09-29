const express = require("express")
const JWT = require("../config/jwt");
const NotificationController = require("../controller/notification.controller");
const app = express()

app.post('/notification',JWT.veriJwt,async function(req,res)
{
    try{
        var response = await NotificationController.readNotificationController(req.body.decoded.code_usuario)

        res.status(200).json({
            status_code: response.length > 0 ? 200 : 300,
            datos: response
        })
    }catch (e) {

        res.status(200).json({
            status_code: 400,
            msm: e.toString()
        })
    }
})


module.exports = app