const express = require("express")
const EmpleadoController = require("../controller/empleado.controller")
const JWT = require("../config/jwt")
const app = express()

app.post("/create_empleado",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await EmpleadoController.insertNewEmpleadoController(req.body.CodigoEmpleado,
            req.body.NombresApellidosEmpleado, req.body.DirEmpleado, req.body.TelefonoEmpleado,
            req.body.EmailEmpleado,req.body.FotoEmpleado, req.body.sucursal)

        res.status(200).json({
            status_code : response ? 200 : 400,
            msm : response ? 'Empleado registrado con éxito' : 'No se ha podido registrar el empleado'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})


app.post("/read_empleado_sucursal",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await EmpleadoController.readEmpleadoSucursalController(req.body.sucursal)

        res.status(200).json({
            status_code : response.length > 0 ? 200 : 300,
            datos: response,
            msm : response.length > 0 ? 'Empleados encontrados' : 'Sin empleados'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})


app.post("/query_empleado_sucursal",JWT.veriJwt,async function(req,res)
{
    try{
        var response = await EmpleadoController.queryEmpleadoSucursalController(req.body.sucursal,req.body.empleado)

        res.status(200).json({
            status_code : response.length > 0 ? 200 : 300,
            datos: response,
            msm : response.length > 0 ? 'Empleados encontrados' : 'Sin empleados'
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})


module.exports = app