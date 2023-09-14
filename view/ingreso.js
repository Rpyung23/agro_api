const express = require("express")
const app = express()
const JWT = require("../config/jwt")
const IngresoController = require("../controller/ingreso.controller")

app.post('/create_ingreso',JWT.veriJwt,async function(req,res)
{
    try{
        var response = await IngresoController.insertIngresoController(req.body.NombreIngreso,req.body.decoded.code_usuario,
            req.body.sucursal_code,req.body.decoded.empresa,req.body.name_cliente,req.body.cantidad,req.body.nota,
            req.body.foto)

        res.status(200).json({
            status_code: response ? 200 : 300,
            msm: response ? 'Ingreso registrado con éxito' : 'No se ha podido guardar el ingreso'
        })
    }catch (e) {

        res.status(200).json({
            status_code: 400,
            msm: e.toString()
        })
    }
})

app.post('/ingreso_fecha',JWT.veriJwt,async function(req,res)
{
    try{
        var response = await IngresoController.readModelIngresoFechaController(req.body.decoded.empresa,
            req.body.sucursal,req.body.fechaI,req.body.fechaF)

        res.status(200).json({
            status_code: 200 ,
            cantidad: response
        })
    }catch (e) {

        res.status(200).json({
            status_code: 400 ,
            cantidad: '0.00'
        })
    }
})

app.post("/ingreso_fecha_sucursal",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await IngresoController.readModelIngresoFechaSucursalController(req.body.sucursal,
            req.body.decoded.code_usuario,req.body.fechaI,req.body.fechaF)

        res.status(200).json({
            status_code: response.length > 0 ? 200 : 300 ,
            datos: response.length > 0 ? response : []
        })
    }catch (e) {
        console.log(e)
        res.status(200).json({
            status_code: 400 ,
            datos:[]
        })
    }
})


app.post("/lista_ultimos_ingresos",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await IngresoController.readListUltimoIngresoController(req.body.decoded.code_usuario)

        res.status(200).json({
            status_code: response.length > 0 ? 200 : 300 ,
            datos: response.length > 0 ? response : []
        })
    }catch (e) {
        console.log(e)
        res.status(200).json({
            status_code: 400 ,
            datos:[]
        })
    }
})

module.exports = app