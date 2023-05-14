const express = require("express")
const app = express()
const GastoController = require("../controller/gasto.controller")
const IngresoController = require("../controller/ingreso.controller")
const JWT = require("../config/jwt");
app.post('/panel_usuario_empresa',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var gasto = await GastoController.readUltimo5GastoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario)
        var ingreso = await IngresoController.readUltimo5IngresoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario)
        res.status(200).json({
            status_code: 200,
            msm: 'Datos obtenidos con éxito',
            ingresos: ingreso,
            gastos: gasto
        })
    }catch (e) {
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            ingresos: '0.00',
            gastos: '0.00'
        })
    }
})

module.exports = app