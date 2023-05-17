const express = require("express")
const JWT = require("../config/jwt");
const GastoController = require("../controller/gasto.controller");
const app = express()

app.post('/create_gasto',JWT.veriJwt,async function(req,res)
{
    try{
        var response = await GastoController.insertGastoUsuarioController(req.body.NombreGasto, req.body.FK_CodigoProveedor,
            req.body.cantidad, req.body.CodigoFactura, req.body.NotaFactura, req.body.QRealizo,
            req.body.FotoFactura, req.body.decoded.empresa, req.body.decoded.code_usuario)

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


module.exports = app