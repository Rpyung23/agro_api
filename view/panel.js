const express = require("express")
const app = express()
const GastoController = require("../controller/gasto.controller")
const IngresoController = require("../controller/ingreso.controller")
const TrabajoController = require("../controller/trabajo.controller")

const JWT = require("../config/jwt");
app.post('/panel_usuario_empresa',JWT.veriJwt,async function (req, res)
{
    //console.log(req.body.decoded)
    try {
        var gastoCinco = await GastoController.readUltimo5GastoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario)
        var ingresoCinco = await IngresoController.readUltimo5IngresoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario)

        var gastoPanel = await GastoController.readGastoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario)

        var ingresoPanel = await IngresoController.readIngresoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario)

        var trabajos = await  TrabajoController.totalTodoTipoTrabajoEmpresaControlle(req.body.decoded.empresa,
            req.body.decoded.code_usuario)

        res.status(200).json({
            status_code: 200,
            msm: 'Datos obtenidos con éxito',
            cinco_ingresos: ingresoCinco,
            cinco_gastos: gastoCinco,
            panel_gasto: gastoPanel,
            panel_ingreso: ingresoPanel,
            empleados:{
                ausentes: 10,
                faltantes: 5,
                presentes: 7
            },
            trabajoPen: trabajos.pendiente
        })
    }catch (e) {
        console.log(e)
        res.status(200).json({
            status_code:400,
            msm: e.toString(),
            cinco_ingresos: '0.00',
            cinco_gastos: '0.00',
            panel_gasto: '0.00',
            panel_ingreso: '0.00',
            empleados:{
                ausentes: 0,
                faltantes: 0,
                presentes: 0
            },
            trabajoPen: 0
        })
    }
})

module.exports = app