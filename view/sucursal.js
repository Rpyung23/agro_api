const JWT = require("../config/jwt")
const SucursalController = require("../controller/sucursal.controller")
const express = require('express')
const app = express()

app.post('/create_sucursal',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var result = await SucursalController.registerSucursalController(req.body.decoded.code_usuario,
            req.body.decoded.empresa,req.body.name,req.body.direc,
            req.body.telefono)
        res.status(200).json({
            status_code:result,
            msm: result == 200 ? 'Sucursal agregada con éxito' : 'No se pudo registrar',
            data:[]
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            data:[]
        })
    }
})


app.post('/list_sucursal_usuario',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var result = await SucursalController.readSucursalUsuarioController(req.body.decoded.code_usuario,
            req.body.decoded.empresa)
        res.status(200).json({
            status_code:result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Sucursales listas' : 'Sin sucursales',
            data: result
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            data:[]
        })
    }
})


module.exports = app