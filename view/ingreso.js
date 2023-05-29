const express = require("express")
const app = express()
const JWT = require("../config/jwt")
const IngresoController = require("../controller/ingreso.controller")
const GastoController = require("../controller/gasto.controller");

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
            status_code: 200 ,
            cantidad: '0.00'
        })
    }
})



module.exports = app