const JWT = require("../config/jwt")
const ProveedorController = require("../controller/proveedor.controller")
const express = require('express')
const app = express()


app.post('/create_proveedor',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {

        var result = await ProveedorController.registerProveedorEmpresaController(req.body.decoded.empresa,
            req.body.NombresApellidosProveedor,req.body.DirProveedor,req.body.TelefonoProveedor,req.body.EmailProveedor,
            req.body.CuentaBancaria,req.body.AtienddeProveedor,req.body.TelefonoEmpresa,req.body.DomicilioGoogle)
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

app.post('/list_proveedor_empresa',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var result = await ProveedorController.readProveedorEmpresaModel(req.body.decoded.empresa)
        res.status(200).json({
            status_code:result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Proveedores listas' : 'Sin proveedores',
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


app.post('/autocomplete_proveedor',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var result = await ProveedorController.readAutocompleteProveedorController(req.body.proveedor)
        res.status(200).json({
            status_code:result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Proveedores listas' : 'Sin proveedores',
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


app.post('/detalle_proveedor',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var result = await ProveedorController.readDetalleProveedorController(req.body.proveedor)
        res.status(200).json({
            status_code:result.length > 0 ? 200 : 300,
            msm: result.length > 0 ? 'Proveedor encontrado' : 'Sin Detalle',
            data: result
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
            data: []
        })
    }
})


app.put('/update_detalle_proveedor',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var result = await ProveedorController.updateDetalleProveedorController(req.body.CodigoProveedor,req.body.NombresApellidosProveedor,
            req.body.AtienddeProveedor,
            req.body.TelefonoEmpresa,req.body.TelefonoProveedor,req.body.DomicilioGoogle,req.body.DirProveedor,req.body.CuentaBancaria)
        res.status(200).json({
            status_code:result  ? 200 : 300,
            msm: result ? 'Datos actualizados' : 'No se ha podido actualizar',
        })
    }catch (e) {
        res.status(200).json({
            status_code: 400,
            msm: e.toString(),
        })
    }
})


module.exports = app