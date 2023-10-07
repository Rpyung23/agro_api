const express = require("express")
const app = express()
const GastoController = require("../controller/gasto.controller")
const IngresoController = require("../controller/ingreso.controller")
const TrabajoController = require("../controller/trabajo.controller")
const UsuarioController = require("../controller/usuario.controller")

const JWT = require("../config/jwt");
app.post('/panel_usuario_empresa',JWT.veriJwt,async function (req, res)
{
    console.log(req.body.sucursal)
    try {

        var gastoCinco = await GastoController.readUltimo5GastoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario,req.body.sucursal)

        var ingresoCinco = await IngresoController.readUltimo5IngresoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario,req.body.sucursal)

        var gastoPanel = await GastoController.readGastoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario,req.body.sucursal,req.body.semana)

        var ingresoPanel = await IngresoController.readIngresoUsuarioController(req.body.decoded.empresa,
            req.body.decoded.code_usuario,req.body.sucursal,req.body.semana)

        var trabajos = await  TrabajoController.totalTodoTipoTrabajoEmpresaControlle(req.body.decoded.empresa,
            req.body.decoded.code_usuario,req.body.sucursal)

        var objEmpleado  = await UsuarioController.readModelEmpleadosPanelController(req.body.decoded.code_usuario,
            req.body.sucursal)

        res.status(200).json({
            status_code: 200,
            msm: 'Datos obtenidos con éxito',
            cinco_ingresos: ingresoCinco  == null ? '0.00' : ingresoCinco,
            cinco_gastos: gastoCinco == null ? '0.00' : gastoCinco,
            panel_gasto: gastoPanel == null ? '0.00' : gastoPanel,
            panel_ingreso: ingresoPanel == null ? '0.00' : ingresoPanel,
            panel_total_gato: (parseFloat(ingresoPanel == null ? '0.00' : ingresoPanel.replace(/[,]/g, "") ) - parseFloat(gastoPanel == null ? '0.00' : gastoPanel.replace(/[,]/g, ""))).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            empleados:{
            ausentes: objEmpleado.ausentes,
                faltantes: objEmpleado.totEmpleados,
                presentes: objEmpleado.asistentes
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