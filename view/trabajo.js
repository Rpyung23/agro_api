const express = require("express")
const app = express()
const JWT = require("../config/jwt")
const TrabajoController = require("../controller/trabajo.controller")

app.post('/create_trabajo',JWT.veriJwt,async function(req,res)
{
    /*NameTrabajo, Fk_Sucursal, empresa, fotoTrabajo, fechaInicio, fechaFin,
        fechaLimite, notaTrabajo, FKEstadoTrabajo*/

    try {
        var response = await TrabajoController.insertTrabajoController(req.body.name_trabajo,req.body.sucursal,
            req.body.decoded.empresa,req.body.fotoTrabajo,req.body.fechaInicio,req.body.fechaFin,
            req.body.fechaLimite,req.body.nota,req.body.estado)

        res.status(200).json({
            status_code: response ?  200 : 400,
            msm : response ?  'Trabajo agregado con éxito' : 'No se pudo agregar'
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm : e.toString()
        })
    }


})

app.post('/query_trabajo',JWT.veriJwt,async function(req,res)
{

    try {
        var response = await TrabajoController.queryReadTrabajoController(req.body.decoded.empresa,req.body.sucursal,req.body.trabajo)

        res.status(200).json({
            status_code: 200,
            datos : response
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            datos: []
        })
    }


})


app.post('/detalle_trabajo',JWT.veriJwt,async function(req,res)
{

    try {
        var response = await TrabajoController.readDetalleTrabajoModel(req.body.decoded.empresa,req.body.sucursal,req.body.trabajo)

        res.status(200).json({
            status_code: response.length > 0 ?  200 : 300,
            datos : response
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            datos: []
        })
    }


})


app.post('/trabajos_usuarios_all',JWT.veriJwt,async function(req,res)
{

    try {
        var response = await TrabajoController.readTrabajoUsuariosController(req.body.decoded.code_usuario)
        res.status(200).json({
            status_code: response.length > 0 ?  200 : 300,
            datos : response
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            datos: []
        })
    }


})



module.exports = app