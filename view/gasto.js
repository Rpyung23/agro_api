const express = require("express")
const JWT = require("../config/jwt");
const GastoController = require("../controller/gasto.controller");
const app = express()

app.post('/create_gasto',JWT.veriJwt,async function(req,res)
{
    try{
        var response = await GastoController.insertGastoUsuarioController(req.body.NombreGasto, req.body.FK_CodigoProveedor,
            req.body.cantidad, req.body.CodigoFactura, req.body.NotaFactura, req.body.QRealizo,
            req.body.FotoFactura, req.body.decoded.empresa, req.body.decoded.code_usuario,req.body.sucursal)

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

app.post('/gasto_fecha',JWT.veriJwt,async function(req,res)
{
    try{
        var response = await GastoController.readModelGastoFechaController(req.body.decoded.empresa,
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


app.post("/gasto_fecha_sucursal",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await GastoController.readModelGastoFechaSucursalController(req.body.sucursal,
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


app.post("/lista_ultimos_gastos",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await GastoController.readListUltimoGastoController(req.body.sucursal)

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